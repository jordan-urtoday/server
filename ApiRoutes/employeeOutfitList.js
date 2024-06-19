import express from 'express';
import EmployeeInfo from '../models/EmployeeInfo.js';
import EmployeeOutfitList from '../models/EmployeeOutfitList.js';
import EmployeeOutfitDetail from '../models/EmployeeOutfitDetail.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const filter = {};
    if (req.query.ShopID) {
        filter.ShopID = req.query.ShopID;
    }

    try {
        const employeeList = await EmployeeOutfitList.find(filter);
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
    const employeeId = req.query.EmployeeID;
    try {
        const getEmployee = await EmployeeInfo.find({ EmployeeID: employeeId });
        const existingOutlist = await EmployeeOutfitList.findOne({ EmployeeID: employeeId, ProductBarcode: req.body.ProductBarcode });
        let saveList, saveDetail;
        if (!getEmployee) {
            return res.formatResponse(null, 404, '找不到指定員工');
        }

        const employeeObj = {
            EmployeeID: getEmployee[0].EmployeeID,
            EmployeeName: getEmployee[0].EmployeeName,
            EmployeeHeight: getEmployee[0].EmployeeHeight,
            EmployeePhoto: getEmployee[0].EmployeePhoto,
        };

        if (existingOutlist) {
            saveList = await EmployeeOutfitList.findOneAndUpdate(
                { EmployeeID: employeeId, ProductBarcode: req.body.ProductBarcode },
                {
                    $set: {
                        ShopName: req.body.ShopName,
                        ShopID: req.body.ShopID,
                        ProductSize: req.body.ProductSize,
                        ProductName: req.body.ProductName,
                        OutfitPostImages: req.body.OutfitPostImages,
                        ...employeeObj
                    }
                },
                { new: true }
            );
            saveDetail = await EmployeeOutfitDetail.findOneAndUpdate(
                { EmployeeID: employeeId, ProductBarcode: req.body.ProductBarcode },
                { 
                    $set: {
                        ...req.body,
                        ...employeeObj,
                    }
                },
                { new: true }
            )
        } else {
            const list = new EmployeeOutfitList({
                ShopName: req.body.ShopName,
                ShopID: req.body.ShopID,
                ProductBarcode: req.body.ProductBarcode,
                ProductSize: req.body.ProductSize,
                ProductName: req.body.ProductName,
                OutfitPostImages: req.body.OutfitPostImages,
                ...employeeObj
            });
            const detail = new EmployeeOutfitDetail({...req.body, ...employeeObj});
            saveList = await list.save();
            saveDetail = await detail.save();
        }
        res.formatResponse(saveDetail);
    } catch (error) {
        res.formatResponse(error, 500, '資料上傳錯誤，請確認格式');
    }
});

router.delete('/', async (req, res) => {
    try {
        await EmployeeOutfitList.findOneAndDelete(req.body.EmployeeID);
        await EmployeeOutfitDetail.findOneAndDelete({ EmployeeID: req.body.EmployeeID, ProductBarcode: req.body.ProductBarcode });
        res.formatResponse(null, 200, '資料刪除成功');
    } catch(error) {
        res.formatResponse(error, 500, '刪除失敗，請確認是否有此id');
    }
})

export default router;