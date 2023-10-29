import Cart from "../models/Cart.js";

// Get all Carts
async function findAll(req, res) {
    try {
        console.log(1234);
        return Cart.find({});
    } catch (error) {
        throw new Error(error.message)
    }
}

async function findOne(req, res, next) {
    const { id } = req.params;
    try {
        console.log(req.params.id);
        return Cart.findById(id).exec();
    } catch (error) {
        throw new Error(error.message)
    }

}
async function createOne(req, res, next) {
    try {
        console.log(req.body);
        const product = req.body.products;

        // Kiểm tra xem product có được định nghĩa và là một mảng
        if (Array.isArray(product) && product.length > 0) {
            const totalProduct = product.reduce((sum, element) => sum + element.total, 0);
            const totalQuantity = product.length;
            let totalPrice = totalQuantity * totalProduct;
           
            const cart = {
                totalProduct: totalProduct,
                totalQuantity: totalQuantity,
                totalPrice: totalPrice
            }
            return await Cart.create({ ...cart, ...req.body });
        } else {
            throw new Error("Invalid or empty 'products' array");
        }
    } catch (error) {
        throw new Error(error.message);
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

        // Kiểm tra xem product có được định nghĩa và là một mảng
        if (Array.isArray(product) && product.length > 0) {
            const totalProduct = product.reduce((sum, element) => sum + element.total, 0);
            const totalQuantity = product.length;
            let totalPrice = totalQuantity * totalProduct;
            
            const cart = {
                totalProduct: totalProduct,
                totalQuantity: totalQuantity,
                totalPrice: totalPrice
            }
            return await Cart.updateOne({ _id: id },{ ...cart, ...req.body });
        }else {
            throw new Error("Invalid or empty 'products' array");
        }

    } catch (error) {
        throw new Error(error.message)
    }

}

export default {
    findAll,
    findOne,
    createOne,
    deleteOne,
    updateOne
}
