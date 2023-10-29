import CommentRepository from "../repositories/CommentRepository.js"


const getAllComment = async (req,res)=>{
    try{
        const result = await CommentRepository.getAllComment()
        if(!result){
            res.status(500).json("Cannot find Comment")
        }else{
            res.status(200).json(result)
        }
    }catch(err){
        res.status(500).json(err)
    }
}

const createComment = async (req,res)=>{
    const id = req.params.id
    try{
        const saveComment = await CommentRepository.createComment(req.body,id)
       
            res.status(200).json(saveComment)
    }catch(err){
        res.status(500).json(err)
    }
}

const getAComment = async (req, res) => {
    try{
       const id = req.params.id;
       const comment = await CommentRepository.getAComment(id)
       res.status(200).json(comment)
    }catch(err){
        res.status(500).json(err)
    }
}

export default {
    getAllComment,
    createComment,
    getAComment
}