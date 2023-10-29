import express from 'express'
import { productController } from '../controllers/index.js'

// Khai báo đối tượng Router
const productRouter = express.Router()


productRouter.get('/', productController.findAll)
productRouter.post('/', productController.createOne)
productRouter.get('/:id/comment', productController.findComment)
productRouter.get('/:id', productController.findOne)
productRouter.delete('/:id', productController.deleteOne)
// hay bị nhầm tên hàm
productRouter.put('/:id', productController.updateOne)

export default productRouter