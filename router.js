const {Router} = require('express');
const router = Router();
const {hash, createToken} = require('./middleware/auth.js');

//Routes
router.use('/login', Router().use((req, res, next) => {
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

module.exports = router;