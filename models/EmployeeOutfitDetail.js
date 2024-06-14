import mongoose, { mongo } from "mongoose";

const EmployeeOutfitDetailSchema = new mongoose.Schema({
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
    },
    OutfitPostDescription: {
        type: String,
        required: false,
    },
    OutfitPostTags: {
        type: Array,
        required: false,
    },
    OutfitPostOtherProducts: {
        type: Array,
        required: false,
    }
})

export default mongoose.model("EmployeeOutfitDetail", EmployeeOutfitDetailSchema, 'employeeOutfitDetail');