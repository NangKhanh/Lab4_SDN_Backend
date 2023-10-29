import express from 'express'
import CommentController from '../controllers/CommentController.js'
const CommentRouter = express.Router()

CommentRouter.get('/getAll',CommentController.getAllComment)
CommentRouter.post('/:id/createComment',CommentController.createComment)
CommentRouter.get("/:id", CommentController.getAComment)

export default CommentRouter