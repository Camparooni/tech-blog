const router = require('express').Router();
const { signUp, signIn, logout, updateUser, updatePassword } = require('../../controllers/userController');
const { isAuthenticated } = require('../../config/middleware/auth');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/logout', isAuthenticated, logout);
router.put('/updateUser', isAuthenticated, updateUser);
router.put('/updatePassword', isAuthenticated, updatePassword);



module.exports = router;