import { matchedData } from "express-validator";
import { PostModel } from "../models/post.model.js";

export const createPost = async (req, res) => {
  try {
    const { title, content, author } = matchedData(req, {
      locations: ["body"],
    });
    const newPost = await PostModel.create({
      title,
      content,
      author,
    });
    return res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("author", "name email");
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;  
    const post = await PostModel.findById(postId).populate("author", "name email");
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content, author } = matchedData(req, {
      locations: ["body"],
    });
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { title, content, author },
      { new: true },
    );
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const deletedPost = await PostModel.findByIdAndDelete(postId);
    return res.status(200).json(deletedPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};
