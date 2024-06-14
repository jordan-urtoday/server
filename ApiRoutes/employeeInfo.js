import express from 'express';
import EmployeeInfo from '../models/EmployeeInfo.js';
import EmployeeOutfitList from '../models/EmployeeOutfitList.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const employeeList = await EmployeeInfo.find();
        res.formatResponse(employeeList);
    } catch(error) {
        res.formatResponse(null, 500, 'Fail');
    }
})

router.get('/find/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const getEmployee = await EmployeeInfo.findById(id);
        const list = await EmployeeOutfitList.find({ EmployeeID: getEmployee.EmployeeID }).select('ProductBarcode ProductSize OutfitPostImages -_id');
        const { EmployeeID, EmployeeName, EmployeeHeight, EmployeePhoto, ShopName, ShopID, EmployeeSNS, EmployeeDescription } = getEmployee;
        let combineResult = {
            EmployeeID,
            EmployeeName,
            EmployeeHeight,
            EmployeePhoto,
            ShopName,
            ShopID,
            EmployeeSNS,
            EmployeeDescription,
            OutfitList: list,
        }
        res.formatResponse(combineResult);
    } catch(error) {
        console.log(error);
        res.formatResponse(null, 500, '找不到資料，請檢查是否有此id');
    }
})

router.post('/', async (req, res) => {
    const newEmployee = new EmployeeInfo(req.body);
    try {
        const saveEmployee = await newEmployee.save();
        res.formatResponse(saveEmployee);
    } catch (error) {
        res.formatResponse(error, 500, '資料上傳錯誤，請確認格式');
    }
})

router.put('/:id',async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const updateEmployee = await EmployeeInfo.findByIdAndUpdate(id, {$set:body}, {new:true});
        res.formatResponse(updateEmployee);
    } catch(error) {
        res.formatResponse(error, 500, '修改失敗，請確認是否有id與欄位格式是否正確');
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await EmployeeInfo.findOneAndDelete(id);
        res.formatResponse(null, 200, '資料刪除成功');
    } catch(error) {
        res.formatResponse(error, 500, '刪除失敗，請確認是否有此id');
    }
})

export default router;
