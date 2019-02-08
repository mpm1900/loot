import express from 'express';
import compression from 'compression';  // compresses requests
import session from 'express-session';
import bodyParser from 'body-parser';
import logger from './util/logger';
import lusca from 'lusca';
import dotenv from 'dotenv';
import mongo, { MongoStore } from 'connect-mongo';
// import flash from 'express-flash';
import path from 'path';
import mongoose from 'mongoose';
import expressValidator from 'express-validator';
import bluebird from 'bluebird';
import { MONGODB_URI, SESSION_SECRET } from './util/secrets';
import { UserModel } from './models/user';
import Bluebird from 'bluebird';

const mongoDB = ''

// const MongoStore = mongo(session);

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env.example' });


// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3005);
// app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressValidator());
// app.use(flash());
// app.use(lusca.xframe('SAMEORIGIN'));
// app.use(lusca.xssProtection(true));

mongoose.Promise = Bluebird
mongoose.connect('mongodb://localhost/27017', {
    useMongoClient: true,
})

app.use((req, res, next) => {
    res.locals.user = req.user;
    res.writeHead(200, {
        'Access-Control-Allow-Origin' : '*'
    });
    next();
});


export default app;