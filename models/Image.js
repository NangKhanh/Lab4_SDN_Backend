import mongoose, { Schema } from "mongoose"

const Image = mongoose.model("Image", new Schema({
    url: String,
    caption: String,
    createdAt: { type: Date, default: Date.now },
    path: String,
}))

export default Image