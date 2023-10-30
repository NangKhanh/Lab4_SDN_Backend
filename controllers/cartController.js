import { cartRepository } from '../repositories/index.js'

async function findAll(req, res) {
    try {
        const carts = await cartRepository.findAll(req, res);
        res.status(200).json({
            message: 'Get all carts successfully.',
            data: carts
        })
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

async function findOne(req, res, next) {

    try {

        const cart = await cartRepository.findOne(req, res, next);

        if (cart.length !== 0) {
            return res.status(200).json({
                message: 'find one cart successfully',
                data: cart
            })
        }
        return res.status(404).json({
            message: 'cart not found'
        });
    } catch (error) {

        res.status(500).json({
            message: error.toString()
        })
    }

}
async function createOne(req, res, next) {

    try {

        const cart = await cartRepository.createOne(req, res, next);
        if (cart) {
            return res.status(201).json({
                message: 'Create cart successfully',
                data: cart
            })
        }
        return res.status(400).json({
            message: 'Can not create cart'
        });

    } catch (error) {
        return res.status(500).json({
            message: error.toString()
        })

    }

}
async function deleteOne(req, res, next) {

    try {

        const cart = await cartRepository.deleteOne(req, res, next);
        if (cart.deletedCount > 0) {
            return res.status(200).json({
                message: 'Delete cart successfully',
                data: cart
            })
        }
        return res.status(400).json({
            message: 'cart not found',
        })
    } catch (error) {

        return res.status(500).json({
            message: error.toString()
        })
    }

}
async function updateOne(req, res, next) {

    try {

        const cart = await cartRepository.updateOne(req, res, next);
        if (cart.modifiedCount > 0) {
            return res.status(200).json({
                message: 'Update cart successfully',
                data: cart
            })
        }
        return res.status(400).json({
            message: 'cart was pay',
        })
    } catch (error) {

        return res.status(500).json({
            message: error.toString()
        })
    }

}
async function updateCartAdd(req, res, next) {

    try {

        const cart = await cartRepository.updateCartAdd(req, res, next);
        if (cart.modifiedCount > 0) {
            return res.status(200).json({
                message: 'Update cart successfully',
                data: cart
            })
        }
        return res.status(200).json({
            message: 'cart was pay',
        })
    } catch (error) {

        return res.status(500).json({
            message: error.toString()
        })
    }

}




export default {
    findAll,
    findOne,
    createOne, deleteOne, updateOne, updateCartAdd
}