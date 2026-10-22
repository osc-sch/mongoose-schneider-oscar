import { Router } from "express";
import {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
} from "../controllers/tags.controller.js";
import { createTagValidation } from "../middlewares/validations/tags.validations.js";

export const tagRoutes = Router();

tagRoutes.post("/api/tags", createTagValidation, createTag);
tagRoutes.get("/api/tags/:tagId", getTagById);
tagRoutes.get("/api/tags", getAllTags);
tagRoutes.put("/api/tags/:tagId", createTagValidation, updateTag);
tagRoutes.delete("/api/tags/:tagId", deleteTag);
