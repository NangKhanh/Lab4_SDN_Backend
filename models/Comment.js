import mongoose, { Schema } from "mongoose"

const Comment = mongoose.model("Comment", new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date, // Assuming createdAt is a date
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencing the 'User' model
    },
}))

export default Comment