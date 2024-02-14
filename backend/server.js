import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMidleware.js';
import productRoutes from "./routes/productRoutes.js"

const port = process.env.PORT || 1234;

const app = express();
connectDB(); // connect to database

app.get('/', (req, res) => {
    res.send("APIIIIIIIIIIIIIIIIIIII ")
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);


app.listen(port, (err, res) => {
    console.log(`Server running on port ${port}`);
});