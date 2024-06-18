import express from 'express';
import ShopList from '../models/ShopList.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const shopList = await ShopList.find();
        res.formatResponse(shopList); 
    } catch(error) {
        res.formatResponse(null, 500, 'Fail'); 
    }
})

export default router;