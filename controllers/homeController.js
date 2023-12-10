const { Post } = require('../models');

const homeController = {
  // home functionality
    getHomePage: async (req, res) => {
        try {
            const posts = await Post.findAll({ 
                order: [['createAt', 'DESC']],
                include: User
            });

            res.render('home', { posts });
        } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        }
    },

    viewPost: async (req, res) => {
        try {
            const postId = req.params.id;
            const post = await Post.findByPk(postId, {
                include: User
            });

            if (!post) {
                return res.status(404).render('404');
            }

            res.render('post', { post });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
};

module.exports = homeController;