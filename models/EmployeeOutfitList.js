import mongoose from "mongoose";

const EmployeeOutfitListSchema = new mongoose.Schema({
    EmployeeID: {
        type: Number,
        required: true,
    },
    EmployeeName: {
        type: String,
        required: true,
    },
    EmployeeHeight: {
        type: String,
        required: true,
    },
    EmployeePhoto: {
        type: String,
        required: false,
    },
    ShopName: {
        type: String,
        required: true,
    },
    ShopID: {
        type: String,
        required: true,
    },
    ProductBarcode: {
        type: String,
        required: true,
    },
    ProductSize: {
        type: String,
        requred: true,
    },
    OutfitPostImages: {
        type: Array,
        required: true,
    }
})

export default mongoose.model("EmployeeOutfitList", EmployeeOutfitListSchema, 'employeeOutfitList');