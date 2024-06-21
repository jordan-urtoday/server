import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
    Code: {
        type: String,
        requried: true
    },
    Name: {
        type: String,
        requried: true
    },
    Url: {
        type: String,
        requried: true
    },
    HeadShot: {
        type: String,
        requried: true
    },
    Logo: {
        type: String,
        requried: true
    },
    Followed: {
        type: String,
        requried: true
    },
    IsFlagshipStore: {
        type: String,
        requried: true
    },
    BrandID: {
        type: String,
        requried: true
    },
    Branch: {
        type: Array,
        requried: true
    },
})

export default mongoose.model("brands", BrandSchema, 'BrandList');