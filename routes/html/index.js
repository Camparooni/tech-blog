const router = require('express').Router();
const { isAuthenticated } = require('../../config/middleware/auth');
const { getHomePage, viewPost, getDashboard, getLogin, getSignup } = require('../../controllers/htmlController');

router.get('/', getHomePage);
router.get('/post/:id', viewPost);
router.get('/dashboard', isAuthenticated, getDashboard);
router.get('/login', getLogin);
router.get('/signup', getSignup);


module.exports = router;