import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// route
import staffApiRoute from './ApiRoutes/staff.js';
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
app.use('/api/v1/staff', staffApiRoute);