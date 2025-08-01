import express from "express"
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile } from "../Controllers/userController.js";
import { protect } from "../Middlewares/authMiddleware.js";
const router = express.Router();
router.post("/", registerUser)
router.post("/auth", authUser);
router.post("/logout", logoutUser)
router.route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)
export default router