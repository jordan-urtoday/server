import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// route
import employeeInfoApiRoute from './ApiRoutes/employeeInfo.js';
import employeeOutfitListAPiRoute from './ApiRoutes/employeeOutfitList.js';
import employeeOutfitDetailAPiRoute from './ApiRoutes/employeeOutfitDetail.js';
import shopListApiRoute from './ApiRoutes/shopList.js';
import productListApiRoute from './ApiRoutes/productList.js';
import brandsApiRoute from './ApiRoutes/brands.js';
// middleware
import { responseFormat } from './middleware/Response.js';

dotenv.config();
const app = express();
const port = 3000;

const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Connected to mongoDB");
    } catch(error) {
        console.log(error);
    }
}

mongoose.connection.on('connected', () => {
    console.log("MongoDB connected");
})

mongoose.connection.on('disconnected', () => {
    console.log("MongoDB disconnected");
})

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    connect();
    console.log(`app listening on port ${port}`);
})

app.use(responseFormat);
app.use(express.json());
// middlewares
app.use('/api/v1/employee', employeeInfoApiRoute);
app.use('/api/v1/list', employeeOutfitListAPiRoute);
app.use('/api/v1/detail', employeeOutfitDetailAPiRoute);
app.use('/api/v1/shops', shopListApiRoute);
app.use('/api/v1/products', productListApiRoute);
app.use('/api/v1/brands', brandsApiRoute);