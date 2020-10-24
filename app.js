const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const database = require('./util/database');
const User = require('./models/user');


const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');//setting templating engine
app.set('views', 'views'); //setting defaut view folder

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use((req, res, next) => {
    User.findById('5f9495fa8115d3822de91e57')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
    next();
});

app.use('/admin',adminRoutes.routes);

app.use(shopRoutes.routes);

app.use(require('./controllers/error').get404);


database.mongoConnect(() => {
    console.log(`Listening on port ${PORT}...`);
    app.listen(PORT);
});
    


