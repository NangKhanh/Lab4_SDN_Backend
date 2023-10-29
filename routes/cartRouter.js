import express from 'express'
import { cartController } from '../controllers/index.js'

const cartRouter = express.Router()


cartRouter.get('/', cartController.findAll)
cartRouter.post('/', cartController.createOne)
cartRouter.get('/:id', cartController.findOne)
cartRouter.delete('/:id', cartController.deleteOne)

cartRouter.put('/:id', cartController.updateOne)

export default cartRouter