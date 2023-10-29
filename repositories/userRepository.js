import Comment from "../models/Comment.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import bcrypt from "bcrypt"

async function Login(req, res) {
    try {
        const findUser = await User.findOne({ email: req.body.email })
        if (!findUser) {
            res.status(401).json({ error: "Wrong email" });
        }
        const comparePassword = await bcrypt.compare(req.body.password, findUser.password);
        if (!comparePassword) {
            res.status(401).json({ error: "Wrong password" });
        }
        if (findUser && comparePassword) {
            return res.status(200).json({data:findUser}) ;
        }
    } catch (error) {
        throw new Error(error.message)
    }
}
// Get all Users
async function findAll(req, res) {
    try {
        console.log(1234);
        return User.find({});
    } catch (error) {
        throw new Error(error.message)
    }
}

async function findOne(req, res, next) {
    const { id } = req.params;
    try {
        console.log(req.params.id);
        return User.findById(id).exec();
    } catch (error) {
        throw new Error(error.message)
    }

}

const register = async ({
    username,
    email,
    password

}) => {
    const userExisting = await User.findOne({ email }).exec()
    if (userExisting != null) {
        throw new Error("User already exists")
    }

    // Encrypt the password
    const hashPassword = await bcrypt.hash(password, parseInt(process.env.SECRET_KEY))

    const newUser = await User.create({
        username,
        email,
        password: hashPassword
    })

    // Clone a new user
    return {
        ...newUser._doc,
        password: "Not show !!!"
    }
}

async function deleteOne(req, res, next) {
    const { id } = req.params;
    try {
        return await User.deleteOne({ _id: id }).exec();

    } catch (error) {
        throw new Error(error.message)
    }

}
async function updateOne(req, res, next) {
    const { id } = req.params;
    try {
        return await User.updateOne({ _id: id }, { ...req.body }).exec();

    } catch (error) {
        throw new Error(error.message)
    }

}

async function addComment (id, user, title, body,productid) {
    await Comment.create({user, title, body }).then(docComment => {
        return Product.findByIdAndUpdate(productid, {
            $push: {
                comments: {"_id": docComment._id}
            }
        })
    })

}

export default {
    findAll,
    findOne,
    register,
    deleteOne,
    updateOne,
    addComment,
    Login,
}
