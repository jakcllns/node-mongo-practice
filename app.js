const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHbs = require('express-handlebars');

const app = express();
const PORT = 3000;

app.engine('hbs', expressHbs({layoutsDirs: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}));

app.set('view engine', 'hbs');//setting templating engine
app.set('views', 'views'); //setting defaut view folder

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminData.routes);

app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404.hbs',{pageTitle: 'Page Not Found'});
})

console.log(`Listening on port ${PORT}...`);
app.listen(PORT);