import express from 'express';
import EmployeeInfo from '../models/EmployeeInfo.js';
import EmployeeOutfitList from '../models/EmployeeOutfitList.js';
import EmployeeOutfitDetail from '../models/EmployeeOutfitDetail.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const query = {};
    if (req.query.BrandID) {
        query['Brand.BrandID'] = req.query.BrandID;
    }
    if (req.query.BranchID) {
        query['Brand.BranchID'] = req.query.BranchID;
    }
    if (req.query.EmployeeID) {
        query['EmployeeID'] = req.query.EmployeeID;
    }
    if (req.query.OutfitID) {
        query['OutfitID'] = req.query.OutfitID;
    }

    try {
        const outList = await EmployeeOutfitList.find(query);
        res.formatResponse(outList);
    } catch (error) {
        res.formatResponse(error, 500, 'Fail');
    }
})

router.post('/', async (req, res) => {
    const employeeId = req.body.EmployeeID;
    try {
        console.log(employeeId);
        const getEmployee = await EmployeeInfo.find({ EmployeeID: employeeId });
        const existingOutlist = await EmployeeOutfitList.findOne({ EmployeeID: employeeId, OutfitID: req.body.OutfitID });
        let saveList;
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
                { EmployeeID: employeeId, OutfitID: req.body.OutfitID },
                {
                    $set: {
                        ...req.body,
                        ...employeeObj
                    }
                },
                { new: true }
            );
        } else {
            const list = new EmployeeOutfitList({
                ...req.body,
                ...employeeObj
            });
            saveList = await list.save();
        }
        res.formatResponse(saveList);
    } catch (error) {
        res.formatResponse(error, 500, '資料上傳錯誤，請確認格式');
    }
});

router.delete('/', async (req, res) => {
    try {
        await EmployeeOutfitList.findOneAndDelete({ EmployeeID: req.body.EmployeeID, OutfitID: req.body.OutfitID });
        res.formatResponse(null, 200, '資料刪除成功');
    } catch(error) {
        res.formatResponse(error, 500, '刪除失敗，請確認是否有此id');
    }
})

export default router;