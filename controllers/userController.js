import { userRepository } from '../repositories/index.js'
import { body, validationResult } from "express-validator";


async function findAll(req, res) {
    try {
        const users = await userRepository.findAll(req, res);
        res.status(200).json({
            message: 'Get all users successfully.',
            data: users
        })
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

async function findOne(req, res, next) {

    try {

        const user = await userRepository.findOne(req, res, next);

        if (user.length !== 0) {
            return res.status(200).json({
                message: 'find one user successfully',
                data: user
            })
        }
        return res.status(404).json({
            message: 'user not found'
        });
    } catch (error) {

        res.status(500).json({
            message: error.toString()
        })
    }

}

const register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // Destructuring object
    const {
        username,
        email,
        password

    } = req.body
    try {
        // debugger
        const newUser = await userRepository.register({ username, email, password })
        res.status(201).json({
            message: 'Register successfully!!',
            data: newUser
        })
    } catch (error) {
        res.status(500).json({
            errors: error.toString(),
        })
    }

}

async function deleteOne(req, res, next) {

    try {

        const user = await userRepository.deleteOne(req, res, next);
        if (user.deletedCount > 0) {
            return res.status(200).json({
                message: 'Delete user successfully',
                data: user
            })
        }
        return res.status(400).json({
            message: 'user not found',
        })
    } catch (error) {

        return res.status(500).json({
            message: error.toString()
        })
    }

}
async function updateOne(req, res, next) {

    try {

        const user = await userRepository.updateOne(req, res, next);
        if (user.modifiedCount > 0) {
            return res.status(200).json({
                message: 'Update user successfully',
                data: user
            })
        }
        return res.status(400).json({
            message: 'user not found',
        })
    } catch (error) {

        return res.status(500).json({
            message: error.toString()
        })
    }

}


async function addComment(req, res, next) {

    try {

        const { id } = req.params;
        const { user, title, body,productid } = req.body;
        const userData = await userRepository.addComment(id, user, title, body, productid);
        console.log(userData);
        res.status(200).send({
            message: "Comment created successfully",
            data: userData
        });
    } catch (error) {

        return res.status(500).json({
            message: error.toString()
        })
    }

}
async function login(req, res) {
    try {
        const users = await userRepository.Login(req,res);
        // Assuming you pass username and password from the request body
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
}



export default {
    login,
    findAll,
    findOne,
    register, deleteOne, updateOne, addComment
}