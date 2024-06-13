import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema({
    staff_id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    photo_url: {
        type: String,
        required: false,
    },
    contact_info: {
        type: String,
        required: false,
    },
    outfits: {
        type: {
            outfit_id: Number,
            photo_url: [String],
            products: [{
                product_id: Number,
                name: String,
                brand: String,
                price: Number,
                image: String,
            }],
        },
        required: false,
    },
    staff_height: {
        type: Number,
        required: true,
    },
    staff_weight: {
        type: Number,
        required: true,
    }
}, {timestamps:true})

StaffSchema.pre('save', async function(next) {
    if (!this.staff_id) {
        // 查询最大的 staff_id
        const maxStaff = await mongoose.model('Staff').findOne().sort({staff_id: -1});
        this.staff_id = maxStaff ? maxStaff.staff_id + 1 : 1; // 如果数据库中有记录，则生成下一个 staff_id，否则从1开始
    }
    next();
});

export default mongoose.model("Staff", StaffSchema);

