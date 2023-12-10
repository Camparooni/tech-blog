const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const { isAuthenticated } = require('../../utils/auth');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.get('/', getHomePage);
router.get('/post/:id', viewPost);
router.get('/dashboard', isAuthenticated, getDashboard);
router.get('/login', getLogin);
router.get('/signup', getSignup);


module.exports = router;