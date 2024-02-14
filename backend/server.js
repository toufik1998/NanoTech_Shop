import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './config/db.js';
import products from './data/products.js'
const port = process.env.PORT || 1234;

const app = express();
connectDB(); // connect to database

app.get('/', (req, res) => {
    res.send("APIIIIIIIIIIIIIIIIIIII ")
});

app.get('/api/products', (req, res) => {
    res.json(products)
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.json(product)
});

app.listen(port, (err, res) => {
    console.log(`Server running on port ${port}`);
});