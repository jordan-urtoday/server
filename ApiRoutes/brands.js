import express from 'express';
import Brands from '../models/Brands.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const brands = await Brands.find();
        res.formatResponse(brands); 
    } catch(error) {
        res.formatResponse(null, 500, 'Fail'); 
    }
})

export default router;