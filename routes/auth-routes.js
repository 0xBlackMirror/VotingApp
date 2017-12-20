const router = require('express').Router();
const passport = require('passport');
// Login Route
router.get('/login', (req, res) => {
	res.render('login', {user: req.user});
});

// Auth Logout
router.get('/logout', (req, res) => {
	// Handle with passport
	req.logout();
	res.redirect('/');
});

// Auth With Google
router.get('/google', passport.authenticate('google', {
	scope: ['profile']
}));
// Callback for google to redirect to
router.get('/google/callback', passport.authenticate('google'),(req, res) => {
	res.redirect('/');
});

module.exports = router;