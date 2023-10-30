import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Get all Carts
async function findAll(req, res) {
    try {
        console.log(1234);

        let productAggregate = [
            // { $unwind: "$images" }, // Giả sử 'image' là một mảng trong Product
            {
                $lookup: {
                    from: "products",
                    localField: "products._id",
                    foreignField: "_id",
                    as: "products"
                },
            },
        ];
        return await Cart.aggregate(
            productAggregate
        );
        return Cart.find({});
    } catch (error) {
        throw new Error(error.message)
    }
}

async function findOne(req, res, next) {
    const { id } = req.params;
    try {

        return Cart.find({ _id: id }).exec();
    } catch (error) {
        throw new Error(error.message)
    }

}

async function createOne(req, res, next) {


    try {
        console.log(req.body);
        return await Cart.create({ ...req.body });
    } catch (error) {
        throw new Error(error.message)
    }

}
async function deleteOne(req, res, next) {
    const { id } = req.params;
    try {
        return await Cart.deleteOne({ _id: id }).exec();

    } catch (error) {
        throw new Error(error.message)
    }

}
async function updateOne(req, res, next) {
    const { id } = req.params;
    try {

        const product = req.body.products;
        product.forEach(product => {
            // Tính toán total
            product.total = product.price * product.quantity * (1 - product.discountPercentage / 100);
        });
        // lấy mảng sản phẩm tính; discountTotal: Number,
        // totalProduct: Number, = tổng các sản phẩm cộng lại trong mảng
        // totalQuantity: Number, = đếm số lượng
        // totalPrice: Number, = tp*tq - discount
        const totalProduct = product.reduce((sum, element) => sum + element.total, 0);
        const totalQuantity = product.length;

        let totalPrice = totalQuantity * totalProduct;
        if (totalPrice > 100) {
            totalPrice = totalPrice * 0.5;
        } else {
            totalPrice = totalPrice * 0.3;
        }
        const cart = {
            totalProduct: totalProduct,
            totalQuantity: totalQuantity,
            totalPrice: totalPrice
        }

        // cart là các giá trị muốn thay đổi nên ta có thể cho ở dưới để update
        console.log("Hello world");

        for (let i = 0; i < req.body.products.length; i++) {
            const { _id, quantity } = req.body.products[i];
            const product = await Product.findById(_id).exec();
            await Product.updateOne({ _id: _id }, { stock: product.stock - quantity })
        }
        req.body.products = [];
        return await Cart.updateOne({ _id: id }, { ...req.body, ...cart })

    } catch (error) {
        throw new Error(error.message)
    }

}

async function updateCartAdd(req, res, next) {
    const { id } = req.params;
    try {
        // console.log(req.body);
        const product = req.body.products;
        console.log(product);
        // nếu nó ấn add to cart mà trùng id với produc                                                                                 t thì mình update lại số lượng của nó
        // update lại kiểu: products{quantity: quantity + 1}
        const idP = req.body.products['_id'];
        const cart = await Cart.findById(id).exec();
        let checkProduct;
        if (cart) {

            checkProduct = cart.products.find(e => e?._id == idP);
        }

        let quantity = 1;
        const { price, discountPercentage } = req.body.products;
        if (checkProduct) {
            // cũ thì update
            quantity = checkProduct.quantity + 1;
            console.log(quantity);

            return await Cart.updateOne(
                { _id: id, 'products._id': idP },
                {
                    $set: {
                        'products.$.quantity': quantity,
                        'products.$.total': quantity * price * discountPercentage
                    }
                })
        }

        return await Cart.updateOne({ _id: id }, { $push: { products: { ...product, quantity: quantity, total: quantity * price * discountPercentage } } })

    } catch (error) {
        throw new Error(error.message)
    }

}

export default {
    findAll,
    findOne,
    createOne,
    deleteOne,
    updateOne,
    updateCartAdd
}