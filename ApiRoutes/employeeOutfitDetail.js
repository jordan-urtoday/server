import express from 'express';
import EmployeeOutfitDetail from '../models/EmployeeOutfitDetail.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const id = req.query.EmployeeID;
    const code = req.query.ProductBarcode;
    try {
        const getDetail = await EmployeeOutfitDetail.find({ EmployeeID: id, ProductBarcode: code });
        res.formatResponse(getDetail);
    } catch (error) {
        res.formatResponse(null, 500, '找不到資料，請檢查是否有此id');
    }
});

export default router;