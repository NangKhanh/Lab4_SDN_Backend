import Comment from "../models/Comment.js";
import Image from "../models/Image.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
// const { ObjectId } = require('mongodb');
import mongoose from "mongoose"
// Get all Products
async function findAll(req, res) {
    console.log(1234);
    try {
        let productAggregate = [
            // { $unwind: "$images" }, // Giả sử 'image' là một mảng trong Product
            {
                $lookup: {
                    from: "images",
                    localField: "images._id",
                    foreignField: "_id",
                    as: "images"
                },
            }
        ];
        return await Product.aggregate(
            productAggregate
        );
        // return Product.find({});
    } catch (error) {
        throw new Error(error.message)
    }
}

async function findOne(req, res, next) {
    const { id } = req.params;

    const idP = new mongoose.Types.ObjectId(id);
    console.log(idP);
    try {
        const productAggregate = [
            {
                $match: { _id: idP }
            },
            {
                $lookup: {
                    from: "images",
                    localField: "images._id",
                    foreignField: "_id",
                    as: "images"
                },
            }
        ];

        const result = await Product.aggregate(productAggregate);
        if (result && result.length > 0) {
            return result; // Return the first element (there should be only one matching product)
        } else {
            // Handle the case where the product with the given ID was not found
            return null;
        }
    } catch (error) {
        throw new Error(error.message);
    }
}
async function findComment(req, res, next) {
    const { id } = req.params;

    const idP = new mongoose.Types.ObjectId(id);
    console.log(idP);
    try {
        console.log(id);
        const productJoin = await Product.aggregate([
            {
                $match: { _id: idP }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "comments._id",
                    foreignField: "_id",
                    as: "comments"
                }
            },
            {
                $unwind: "$comments"
            },
            {
                $lookup: {
                    from: "users",
                    localField: "comments.user",
                    foreignField: "_id",
                    as: "comments.user"
                }
            },
            {
                $unwind: "$comments.user"
            },{
                $project: {
                    "comments.user.password": 0 // Loại bỏ trường password
                }
            },
            {
                $group: {
                    _id: "$_id",
                    comments: { $push: "$comments" }
                }
            }
        ]);

        console.log(productJoin);
        return productJoin[0].comments;
    } catch (error) {
        throw new Error(error.message)
    }
}

// async function findComment(req, res, next) {
//     const { id } = req.params;

//     const idP = new mongoose.Types.ObjectId(id);
//     console.log(idP);
//     try {
//         console.log(id);
//         const productJoin = await Product.aggregate([
//             {
//                 $match: { _id: idP }
//             },
//             {
//                 $lookup: {
//                     from: "comments",
//                     localField: "comments._id",
//                     foreignField: "_id",
//                     as: "comments"
//                 }
//             },{
//                 $unwind: "$comments"
//             },{
//                 $lookup: {
//                     from: "comments",
//                     localField: "comments.user",
//                     foreignField: "_id",
//                     as: "comments.user"
//                 }
//             },
//             {
//                 $unwind: "$comments.user"
//             },
//             {
//                 $group: {
//                     _id: "$_id",
//                     comments: { $push: "$comments" }
//                 }
//             }
//         ]);

//         // Lặp qua danh sách bình luận và tìm tên người dùng
//         // for (const comment of productJoin[0].comments) {
//         //     const user = await User.findById(comment.user);
//         //     if (user) {
//         //         comment.Username = user.username; // Thêm trường "name" vào bình luận
//         //     }
//         // }

//         console.log(productJoin);
//         return productJoin[0].comments;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }
async function createOne(req, res, next, thumbnail) {


    try {
        console.log(thumbnail);
        // insert many, create
        const image = await Image.insertMany(thumbnail);
        // return await Image.insertMany(thumbnail);

        return await Product.create({
            ...req.body,
            images: image,
        });
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
    updateOne,
    findComment
}
