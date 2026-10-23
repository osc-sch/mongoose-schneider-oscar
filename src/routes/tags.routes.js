import { Router } from "express";
import {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
} from "../controllers/tags.controller.js";
import { createTagValidation } from "../middlewares/validations/tags.validations.js";
import { validate } from "../middlewares/validate.middleware.js";

export const tagRoutes = Router();

tagRoutes.post("/api/tags", createTagValidation, validate, createTag);
tagRoutes.get("/api/tags/:tagId", getTagById);
tagRoutes.get("/api/tags", getAllTags);
tagRoutes.put("/api/tags/:tagId", createTagValidation, validate, updateTag);
tagRoutes.delete("/api/tags/:tagId", deleteTag);
