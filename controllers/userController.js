const { User } = require('../models');
const passport = require('../config/passport');

const userController = {
  // Implement methods to handle user-related functionality
    signUp: async (req, res) => {
        try {
        // Handle user registration logic
        const { username, password } = req.body;

        const existingUser = await User.findOne({ where: { username } });

        if (existingUser) {
            return res.status(400).json({ error: 'Username is already taken' });
        }
        
        const newUserr = await User.create({ username, password });

        req.login(newUser, (err) => {
            if(err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            return res.redirect('/');
        });
        } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        }
    },

    signIn: passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }),

    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
};

module.exports = userController;