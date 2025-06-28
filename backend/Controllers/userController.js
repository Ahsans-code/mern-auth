import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc Auth users/set token
//route POST /api/user/auth
//@access Public
const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({ email })


    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(404);
        throw new Error("Invalid email or password");

    }
});

//@desc Register user
//route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error("User already exist")
    }

    const user = await User.create({
        name, email, password
    })
    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(404);
        throw new Error("Bad Request: user data is invalid");

    }

});

//@desc logout user
//route POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', "", {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({
        message: "User loged out successfully!"
    })
});

//@desc get user profile
//route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
    if (user) {
        res.status(200).json({
            name: user.name,
            email: user.email,
        })

    } else {
        res.status(404)
        throw new Error("Failed to fetch user data!")
    }
});

//@desc Update user profile
//route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const { email, name } = req.body
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = name || user.name
        user.email = email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        })

    } else {
        res.status(404)
        throw new Error("Failed to update user data!")
    }
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile };