import { Router } from "express";
import { getAllUsers, registerUser } from "../controllers/user.controller.js";
import { registerValidation } from "../middlewares/validations/auth.validation.js";

export const userRoutes = Router();

userRoutes.post("/api/users", registerValidation, registerUser);
userRoutes.get("/api/users", getAllUsers);
