const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');//setting templating engine
app.set('views', 'views'); //setting defaut view folder

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminRoutes.routes);

app.use(shopRoutes.routes);

app.use(require('./controllers/error').get404);

console.log(`Listening on port ${PORT}...`);
app.listen(PORT);