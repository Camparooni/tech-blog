
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
};

module.export = { isAuthenticated };