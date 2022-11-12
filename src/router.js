const express = require('express');
const router = express.Router();
const {hash, createToken} = require('../middleware/auth.js');

if(process.env.MAINTENANCE.toLowerCase() === "true") router.use((req, res) => {
    res.status(503);
    res.render('errors/503')
})

//Routes
router.use('/login', express.Router().use((req, res, next) => {
    if(!req?.logged) next();
    else res.redirect('/')
}).get('/', (req, res) => {
    res.render("login");
}).post('/', (req, res) => {
    const {secret} = req.body;
    if(hash(secret) === process.env.SECRET){
        res.cookie('token', createToken(), {maxAge: 1000 * 60 * 10})
        res.redirect('/')
    } else res.render('login', {message: 'Invalid password', messageClass: 'alert-danger'})
}))


router.get('/logout', (req, res) => {
    if(req.logged) {
        res.clearCookie('token');
    }
    res.redirect('/');
})

router.get("/", (req, res) => {
    if(!req.logged) res.redirect('/login');
    else res.render('home');
});

// Other handlings
router.use(express.static("public"));
router.use((req, res) => {
    res.status(404);
    res.render('errors/404')
})

module.exports = router;