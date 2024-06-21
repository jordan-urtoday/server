import express from 'express';
import BrandList from '../models/BrandList.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const brands = await BrandList.find();
        res.formatResponse(brands); 
    } catch(error) {
        res.formatResponse(null, 500, 'Fail'); 
    }
})

export default router;