import express from 'express';
import EmployeeOutfitList from '../models/EmployeeOutfitList.js';
import EmployeeOutfitDetail from '../models/EmployeeOutfitDetail.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const employeeList = await EmployeeOutfitList.find();
        res.formatResponse(employeeList);
    } catch(error) {
        res.formatResponse(null, 500, 'Fail'); 
    }
})

router.get('/find/:id', async (req, res) => {
    const employeeId = req.params.id;
    try {
        const employeeList = await EmployeeOutfitList.find({ EmployeeID: employeeId });
        res.formatResponse(employeeList);
    } catch(error) {
        res.formatResponse(null, 500, 'Fail'); 
    }
})

router.post('/', async (req, res) => {
    const list = new EmployeeOutfitList({
        EmployeeID: req.body.EmployeeID,
        EmployeeName: req.body.EmployeeName,
        EmployeeHeight: req.body.EmployeeHeight,
        EmployeePhoto: req.body.EmployeePhoto,
        ShopName: req.body.ShopName,
        ShopID: req.body.ShopID,
        ProductBarcode: req.body.ProductBarcode,
        ProductSize: req.body.ProductSize,
        OutfitPostImages: req.body.OutfitPostImages,
    });
    const detail = new EmployeeOutfitDetail(req.body);
    try {
      const saveList = await list.save();
      const saveDetail = await detail.save();
      res.formatResponse(saveDetail);
    } catch (error) {
        res.formatResponse(error, 500, '資料上傳錯誤，請確認格式');
    }
});

router.put('/:id',async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const updateList = await EmployeeOutfitList.findByIdAndUpdate(id, {$set: {
            EmployeeID: req.body.EmployeeID,
            EmployeeName: req.body.EmployeeName,
            EmployeeHeight: req.body.EmployeeHeight,
            EmployeePhoto: req.body.EmployeePhoto,
            ShopName: req.body.ShopName,
            ShopID: req.body.ShopID,
            ProductBarcode: req.body.ProductBarcode,
            ProductSize: req.body.ProductSize,
            OutfitPostImages: req.body.OutfitPostImages,
        }}, {new:true});
        const updateDetail = await EmployeeOutfitDetail.findByIdAndUpdate(id, {$set:body}, {new:true});
        res.formatResponse(updateDetail);
    } catch(error) {
        res.formatResponse(error, 500, '修改失敗，請確認是否有id與欄位格式是否正確');
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await EmployeeOutfitList.findOneAndDelete(id);
        await EmployeeOutfitDetail.findOneAndDelete({ EmployeeID: req.params.EmployeeID, ProductBarcode: req.params.ProductBarcode });
        res.formatResponse(null, 200, '資料刪除成功');
    } catch(error) {
        res.formatResponse(error, 500, '刪除失敗，請確認是否有此id');
    }
})

export default router;