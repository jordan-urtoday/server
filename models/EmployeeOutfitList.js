import mongoose from "mongoose";

const EmployeeOutfitListSchema = new mongoose.Schema({
    EmployeeID: {
        type: Number,
        required: true,
        unique: false,
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
    OutfitPostImages: {
        type: Array,
        required: true,
    },
    OutfitPostDescription: {
        type: String,
        requred: true,
    },
    OutfitPostTags: {
        type: Array,
        required: true,
    },
    OutfitPostItems: {
        type: Array,
        required: true,
    },
    Brand: {
        type: Object,
        required: true,
    },
    OutfitID: {
        type: Number,
        required: true,
    }
})

EmployeeOutfitListSchema.pre('validate', async function(next) {
    if (this.isNew && !this.OutfitID) {
        const maxOutfit = await mongoose.model('EmployeeOutfitList').findOne().sort({ OutfitID: -1 });
        this.OutfitID = maxOutfit ? maxOutfit.OutfitID + 1 : 1;
    }
    next();
});

export default mongoose.model("EmployeeOutfitList", EmployeeOutfitListSchema, 'employeeOutfitList');