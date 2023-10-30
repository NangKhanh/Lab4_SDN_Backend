import express from 'express'
import { cartController } from '../controllers/index.js'

// Khai báo đối tượng Router
const cartRouter = express.Router()
cartRouter.get('/', cartController.findAll)

cartRouter.post('/', cartController.createOne)
cartRouter.get('/:id', cartController.findOne)
cartRouter.delete('/:id', cartController.deleteOne)
cartRouter.put('/:id', cartController.updateOne)
cartRouter.put('/add/:id', cartController.updateCartAdd)

export default cartRouter