import mongoose from "mongoose";

const EmployeeInfoSchema = new mongoose.Schema({
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
    EmployeeSNS: {
        type: Object,
        required: false,
    },
    EmployeeDescription: {
        type: String,
        required: false,
    },
    Brand: {
        type: Array,
        required: true,
    }
})

EmployeeInfoSchema.pre('validate', async function(next) {
    if (this.isNew && !this.EmployeeID) {
        const maxEmployee = await mongoose.model('EmployeeInfo').findOne().sort({ EmployeeID: -1 });
        this.EmployeeID = maxEmployee ? maxEmployee.EmployeeID + 1 : 1;
    }
    next();
});

export default mongoose.model("EmployeeInfo", EmployeeInfoSchema, 'employeeInfo');