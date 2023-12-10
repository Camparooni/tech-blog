const { Post, Comment } = require('../models');

const postController = {
  // post functionality
    getPost: async (req, res) => {
        try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId, {
            include: [
                {
                    model: Comment,
                    include: User
                }
            ]
        });

        if(!post) {
            return res.status(404).render('404');
        }

        res.render('post', { post });
        } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        }
    },


    createComment: async (req, res) => {
        try {
        // Create a new comment
            const { postId, commentText } = req.body;
            const userId = req.user.id;

            const comment = await Comment.create({
                text: commentText,
                UserId: userId,
                PostId: postId
            });

            res.redirect(`/post/${postId}`);
        } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        }
    },
  // Other methods for handling different post actions
    updatePost: async (req, res) => {
        try {
            const postId = req.params.id;
            const { title, content } = req.body;

            const updatedPost = await Post.update(
                { title, content },
                { where: { id: postId } }
            );

            if(!updatedPost[0]) {
                return res.status(404).json({error: 'Post not found' });
            }

            res.redirect(`/post/${postId}`);
        } catch (err) {
            console.error(err);
            res.status (500).json({ error: 'Internal server error' });
        }
    },

    deletePost: async (req, res) => {
        try {
            const postId = req.params.id;

            const deletedPost = await Post.destroy({
                where: { id: postId }
            });

            if (!deletedPost) {
                return res.status(404).json({ error: 'Post not found' });
            }

            res.redirect('/dashboard');
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = postController;