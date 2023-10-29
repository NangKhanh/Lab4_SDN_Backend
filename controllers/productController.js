import { productRepository } from '../repositories/index.js'

async function findAll(req, res) {
    try {
        const products = await productRepository.findAll(req, res);
        res.status(200).json({
            message: 'Get all products successfully.',
            data: products
        })
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

async function findOne(req, res, next) {

    try {

        const product = await productRepository.findOne(req, res, next);

        if (product.length !== 0) {
            return res.status(200).json({
                message: 'find one product successfully',
                data: product
            })
        }
        return res.status(404).json({
            message: 'Product not found'
        });
    } catch (error) {

        res.status(500).json({
            message: error.toString()
        })
    }

}
async function findComment(req, res, next) {

    try {

        const product = await productRepository.findComment(req, res, next);

        if (product.length !== 0) {
            return res.status(200).json({
                message: 'find product comment successfully',
                data: product
            })
        }
        return res.status(404).json({
            message: 'Product comment not found'
        });
    } catch (error) {

        res.status(500).json({
            message: error.toString()
        })
    }

}
async function createOne(req, res, next) {

    try {

        const product = await productRepository.createOne(req, res, next);
        if (product) {
            return res.status(201).json({
                message: 'Create product successfully',
                data: product
            })
        }
        return res.status(400).json({
            message: 'Can not create product'
        });

    } catch (error) {
        return res.status(500).json({
            message: error.toString()
        })

    }

}

async function deleteOne(req, res, next) {

    try {

        const product = await productRepository.deleteOne(req, res, next);
        if (product.deletedCount > 0) {
            return res.status(200).json({
                message: 'Delete product successfully',
                data: product
            })
        }
        return res.status(400).json({
            message: 'Product not found',
        })
    } catch (error) {

        return res.status(500).json({
            message: error.toString()
        })
    }

}
async function updateOne(req, res, next) {

    try {

        const product = await productRepository.updateOne(req, res, next);
        if (product.modifiedCount > 0) {
            return res.status(200).json({
                message: 'Update product successfully',
                data: product
            })
        }
        return res.status(400).json({
            message: 'Product not found',
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
    createOne, deleteOne, updateOne,
    findComment
}