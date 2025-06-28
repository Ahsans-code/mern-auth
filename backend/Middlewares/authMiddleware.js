import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken"
import User from "../Models/userModel.js";
const protect = expressAsyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies?.jwt
    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decode.userId).select("-password");
            next()
        } catch (error) {
            res.status(401)
            throw new Error("Not authorized, Invalid token")
        }
    } else {
        res.status(401)
        throw new Error("Not authorized, No tokem")
    }
})
export { protect }