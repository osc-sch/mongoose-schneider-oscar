import { Router } from "express";

import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

import {
  createPostValidation,
  updatePostValidation,
} from "../middlewares/validations/post.validations.js";
import {
  validateAddTag,
  validateRemoveTag,
} from "../middlewares/validations/tags.validations.js";
import { validate } from "../middlewares/validate.middleware.js";
import { addTag, removeTag } from "../controllers/tags.controller.js";

export const postRoutes = Router();

postRoutes.delete(
  "/api/posts/:id/tags/:tagId",
  validateRemoveTag,
  validate,
  removeTag,
);
postRoutes.post("/api/posts/:id/tags/:tagId", validateAddTag, validate, addTag);
postRoutes.post("/api/posts", createPostValidation, validate, createPost);
postRoutes.get("/api/posts/:postId", getPostById);
postRoutes.get("/api/posts", getAllPosts);
postRoutes.put("/api/posts/:postId", updatePostValidation, updatePost);
postRoutes.delete("/api/posts/:postId", deletePost);
