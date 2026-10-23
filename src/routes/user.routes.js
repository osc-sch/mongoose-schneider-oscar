import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  registerUser,
  updateUser,
} from "../controllers/user.controller.js";
import {
  registerValidation,
  updateValidation,
} from "../middlewares/validations/auth.validation.js";
import { validate } from "../middlewares/validate.middleware.js";

export const userRoutes = Router();

userRoutes.post("/api/users", registerValidation, validate, registerUser);
userRoutes.get("/api/users/:userId", getUserById);
userRoutes.get("/api/users", getAllUsers);
userRoutes.put("/api/users/:userId", updateValidation, validate, updateUser);
userRoutes.delete("/api/users/:userId", deleteUser);
