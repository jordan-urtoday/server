import mongoose from "mongoose";

const ProductListSchema = new mongoose.Schema({
    name: {
        type: String,
        requried: true
    },
    code: {
        type: String,
        requried: true
    },
    SellPrice: {
        type: Number,
        requried: true
    },
    OriginPrice: {
        type: Number,
        requried: true
    },
    image_url: {
        type: String,
        requried: true
    },
    store: {
        type: Number,
        requried: true
    },
    brand: {
        type: String,
        requried: true
    },
})

export default mongoose.model("productList", ProductListSchema, 'productList');