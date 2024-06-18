import express from 'express';
import ProductList from '../models/ProductList.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const filter = {};
    if (req.query.name) {
        filter.name = req.query.name
    }

    try {
        const productList = await ProductList.find(filter);
        res.formatResponse(productList); 
    } catch(error) {
        res.formatResponse(null, 500, 'Fail'); 
    }
})

export default router;