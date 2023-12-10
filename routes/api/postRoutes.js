const router = require('express').Router();
const { getPost, createComment, updatePost, deletePost } = require('../../controllers/postController');
const { isAuthenticated } = require('../../config/middleware/auth');

router.get('/:id', getPost);
router.post('/:id/comment', isAuthenticated, createComment);
router.put('/:id/update', isAuthenticated, updatePost);
router.delete('/:id/delete', isAuthenticated, deletePost);


module.exports = router;