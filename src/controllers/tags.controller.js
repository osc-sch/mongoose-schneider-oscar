import { matchedData } from "express-validator";
import { TagModel } from "../models/tags.model.js";
import { PostModel } from "../models/post.model.js";

export const createTag = async (req, res) => {
  try {
    const { nombre, descripcion } = matchedData(req, { locations: ["body"] });
    const newTag = await TagModel.create({ nombre, descripcion });
    return res.status(201).json(newTag);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const tags = await TagModel.find();
    return res.status(200).json(tags);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const getTagById = async (req, res) => {
  try {
    const { tagId } = req.params;
    const tag = await TagModel.findById(tagId);
    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }
    return res.status(200).json(tag);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const updateTag = async (req, res) => {
  try {
    const { tagId } = req.params;
    const { nombre, descripcion } = matchedData(req, { locations: ["body"] });
    const updatedTag = await TagModel.findByIdAndUpdate(
      tagId,
      { nombre, descripcion },
      { returnDocument: "after" },
    );
    if (!updatedTag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }
    return res.status(200).json(updatedTag);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const { tagId } = req.params;
    const deletedTag = await TagModel.findByIdAndDelete(tagId);
    if (!deletedTag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }
    return res.status(200).json(deletedTag);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const addTag = async (req, res) => {
  try {
    const { id, tagId } = matchedData(req, {
      locations: ["params"],
    });

    const post = await PostModel.findByIdAndUpdate(
      id,
      {
        $addToSet: { tags: tagId },
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    ).populate("tags", "nombre descripcion");

    if (!post) {
      return res.status(404).json({
        message: "Publicación no encontrada",
      });
    }

    return res.status(200).json({
      message: "Etiqueta agregada correctamente",
      data: post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al agregar la etiqueta",
    });
  }
};

export const removeTag = async (req, res) => {
  try {
    const { id, tagId } = matchedData(req, {
      locations: ["params"],
    });

    const post = await PostModel.findByIdAndUpdate(
      id,
      {
        $pull: { tags: tagId },
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    ).populate("tags", "nombre descripcion");

    if (!post) {
      return res.status(404).json({
        message: "Publicación no encontrada",
      });
    }

    return res.status(200).json({
      message: "Etiqueta desvinculada correctamente",
      data: post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al quitar la etiqueta",
    });
  }
};
