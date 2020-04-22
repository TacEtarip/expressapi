import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import jwt from 'jsonwebtoken';
import {connectDB} from './src/lib/ds'; 

import {test} from './src/config/index'; 

import routes from './src/routes/crmRoutes.js';

// const x = new express.Router();

const app = express();
const port = 3000;

/*mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});*/

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

/*const connectDB = async() => {
    try {
        await mongoose.connect(ds.database, { useNewUrlParser: true, useUnifiedTopology:true});
        console.log('Connected To DataBase');          
    } catch (error) {
        console.log(err.message);
        process.exit(0);
    }
};*/

connectDB(test);

app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

app.use(express.static('public'));//para usarlo escribe localhost/anime.png ó anime2.jpg

routes(app);

// app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port port!`));