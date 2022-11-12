//Constants
const express = require("express");
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5173;

//App configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require("../middleware/auth").authenticate);
app.engine('hbs', exphbs({
    extname: '.hbs',
    helpers: require('../public/js/helpers.js'),
}));
app.set('views', './public/views')
app.set('view engine', 'hbs');

//Handling routes
app.use(require('./router.js'));

//Run
app.listen(port, () => {
	console.log(`Elina WS is listening on port ${port}`);
});