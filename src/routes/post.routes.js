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

export const postRoutes = Router();

postRoutes.post("/api/posts", createPostValidation, createPost);
postRoutes.get("/api/posts/:postId", getPostById);
postRoutes.get("/api/posts", getAllPosts);
postRoutes.put("/api/posts/:postId", updatePostValidation, updatePost);
postRoutes.delete("/api/posts/:postId", deletePost);
