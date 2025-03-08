import express from "express";
import {
  register,
  login,
  logout,
  sendVerifyOtp,
  verifyEmail,
  isAuthenticated,
  sendResetOtp,
  resetPassword,
  createSubjectData,
  dashboardData,
  usersDashboard,
  deleteUsers,
  updateSubject,
  deleteSubject,
} from "../controllers/authControllers.js";
import userAuth from "../middleware/userAuth.js";
import { getUserData } from "../controllers/userController.js";
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);
authRouter.get("/is-auth", userAuth, isAuthenticated);
authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/reset-password", resetPassword);

/** ** *** *** *** *** *** For Subject Data *** *** *** *** **** *** *** ***  */

authRouter.get("/ritesh/dashboard", dashboardData);
authRouter.post("/ritesh/dashboard/create", createSubjectData);
authRouter.get("/ritesh/dashboard/subject");
authRouter.put("/ritesh/dashboard/subject/update/:id",updateSubject);
authRouter.delete("/ritesh/dashboard/subject/delete/:id",deleteSubject);
authRouter.get("/ritesh/dashboard/users", usersDashboard);
authRouter.delete("/ritesh/dashboard/users/:email", deleteUsers);
authRouter.get("/ritesh/dashboard/profile", userAuth);

export default authRouter;
