import Category from "../models/Category.js";
import Product from "../models/Product.js";

// Get all Products
async function findAll(req, res) {
    try {
        // db.books.find ( { $or: [ { quantity: { $lt: 200 } }, { price: 500 } ] } ) 
        let productAggregate = [
            // stock >= 94 and price == 549

            {
                $lookup: {
                    from: "brands", // collection name in db
                    localField: "brand", // collection.localfiled: của productt
                    foreignField: "id",
                    as: "brand" // tên của thuộc tính trong join
                },
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: 'id',
                    as: 'category'
                }
            },
        ]
        // if (req.query.stock) {
        //     productAggregate.push({ $match: { $and: [{ stock: { $gte: 94 } }, { price: 549 }] } },)
        // }
        return await Product.aggregate(
            productAggregate
        );
    } catch (error) {
        throw new Error(error.message)
    }
}

async function findOne(req, res, next) {
    const { id } = req.params;
    try {
        console.log(req.params.id);
        const productJoin = await Product.aggregate([
            {
                $lookup: {
                    from: "brands",
                    localField: "brand",
                    foreignField: "id",
                    as: "brand"
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: 'id',
                    as: 'category'
                }
            },
            {
                $match: { id: parseInt(id) }
            }
        ]);
        return productJoin;
    } catch (error) {
        throw new Error(error.message)
    }

}
async function createOne(req, res, next) {

    const items = await Product.find().sort({ id: -1 });
    const count = items[0].id + 1;
    const idCount = { id: count }
    try {
        console.log(req.body);

        return await Product.create({ ...idCount, ...req.body });
    } catch (error) {
        throw new Error(error.message)
    }

}
async function deleteOne(req, res, next) {
    const { id } = req.params;
    try {
        return await Product.deleteOne({ _id: id }).exec();

    } catch (error) {
        throw new Error(error.message)
    }

}
async function updateOne(req, res, next) {
    const { id } = req.params;
    try {
        return await Product.updateOne({ _id: id }, { ...req.body }).exec();

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
