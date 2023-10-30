import mongoose, { Schema } from "mongoose"

const Cart = mongoose.model("Cart", new Schema({
    discountTotal: Number,
    totalProduct: Number,
    totalQuantity: Number,
    totalPrice: Number,
    products: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Referencing the 'product' model
        },
        name: String,
        price: Number,
        quantity: Number,
        discountPercentage: Number,
        total: Number,

    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencing the 'User' model
    }
}))

export default Cart