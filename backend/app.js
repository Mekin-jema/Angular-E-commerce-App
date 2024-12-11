import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authJwt from './helpers/jwt.js';
import errorHandler from './helpers/error-handler.js';
import path from 'path';
import { fileURLToPath } from 'url';

//routes
import categoriesRoutes from './routes/categories.route.js';
import productsRoutes from './routes/products.route.js';
import usersRoutes from './routes/users.route.js';
import ordersRoutes from './routes/orders.route.js';

// config dot env
dotenv.config();

const app = express();

app.use(cors());
app.options('*', cors());

//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(authJwt());
app.use(morgan('tiny'));
app.use(errorHandler);

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React build folder
app.use('/public/uploads', express.static(path.join(__dirname, '/public/uploads')));
//Database
mongoose
    .connect(process.env.CONNECTION_STRING, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // dbName: 'mean-eshop'
    })
    .then(() => {
        console.log('Database Connection is ready...');
    })
    .catch((err) => {
        console.log(err);
    });

//Server
app.listen(3000, () => {
    console.log('server is running http://localhost:3000');
});
