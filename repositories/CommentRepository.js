import Comment from "../models/Comment.js"
import Product from "../models/Product.js"
import User from "../models/User.js"

async function getAllComment(){
    try{
        const result = await Comment.find({}).populate('user');
        if(!result){
            return {
                status: "FAIL",
                message: "Can not get All Comment"
            }
        }else{
            return{
                status: "OK",
                message: "Successfully",
                data: result
            }
        }
    }catch(err){
        throw Error(err)
    }
} 

async function createComment(newComment, id){
        const {title, body} = newComment
    try{
        const saveComment = await Comment.create({
            title,
            body,
            createAt: Date.now()
        })
        const saveProduct = await User.findByIdAndUpdate(id)
        await saveProduct.updateOne({
            $push: {
                comments: {
                    _id:saveComment._id
                }
            }
        })
        if(saveComment){
            return {
                status: "OK",
                data: saveComment,
                data1: saveProduct
            }
        }else{
            return {
                status: "FAIL"
            }
        }
    }catch(err){
        throw Error(err)
    }
} 

async function getAComment(id){
    try{
        const result = await Comment.findById(id)
            return {
                status: "OK",
                data: result
            }
        
    }catch(err){
        throw Error(err)
    }
}

export default {
    getAllComment,
    createComment,
    getAComment
}