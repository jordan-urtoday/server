import express from 'express';
import Staff from '../models/Staff.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const staffList = await Staff.find();
        res.formatResponse(staffList);
    } catch(error) {
        res.formatResponse(null, 500, 'Fail');
    }
})

router.get('/find/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const getStaff = await Staff.findById(id);
        res.formatResponse(getStaff);
    } catch(error) {
        console.log(error);
        res.formatResponse(null, 500, '找不到資料，請檢查是否有此id');
    }
})

router.post('/', async (req, res) => {
    const newStaff = new Staff(req.body);
    try {
        const saveStaff = await newStaff.save();
        res.formatResponse(saveStaff);
    } catch (error) {
        res.formatResponse(error, 500, '資料上傳錯誤，請確認格式');
    }
})

router.put('/:id',async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const updateStaff = await Staff.findByIdAndUpdate(id, {$set:body}, {new:true});
        res.formatResponse(updateStaff);
    } catch(error) {
        res.formatResponse(error, 500, '修改失敗，請確認是否有id與欄位格式是否正確');
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Staff.findOneAndDelete(id);
        res.formatResponse(null, 200, '資料刪除成功');
    } catch(error) {
        res.formatResponse(error, 500, '刪除失敗，請確認是否有此id');
    }
})

export default router;