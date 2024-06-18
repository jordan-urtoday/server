import mongoose from "mongoose";

const ShopListSchema = new mongoose.Schema({
    id: {
        type: String,
        requried: true
    },
    name: {
        type: String,
        requried: true
    },
})

export default mongoose.model("shopList", ShopListSchema, 'shopList');