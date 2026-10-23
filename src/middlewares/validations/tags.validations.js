import { body, param } from "express-validator";
import { PostModel } from "../../models/post.model.js";
import { TagModel } from "../../models/tags.model.js";
import mongoose from "mongoose";

export const createTagValidation = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre de la etiqueta es obligatorio"),
  body("descripcion")
    .notEmpty()
    .withMessage("La descripción de la etiqueta es obligatoria"),
];

export const validateAddTag = [
  param("id")
    .isMongoId()
    .withMessage("ID de publicación inválido")
    .bail()
    .custom(async (id) => {
      const existe = await PostModel.exists({ _id: id });

      if (!existe) {
        throw new Error("La publicación no existe");
      }

      return true;
    }),

  param("tagId")
    .isMongoId()
    .withMessage("ID de etiqueta inválido")
    .bail()
    .custom(async (tagId) => {
      const existe = await TagModel.exists({ _id: tagId });

      if (!existe) {
        throw new Error("La etiqueta no existe");
      }

      return true;
    })
    .custom(async (tagId, { req }) => {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return true;
      }

      const duplicado = await PostModel.exists({
        _id: req.params.id,
        tags: tagId,
      });

      if (duplicado) {
        throw new Error("La etiqueta ya está vinculada");
      }

      return true;
    }),
];

export const validateRemoveTag = [
  param("id").isMongoId().withMessage("ID de publicación inválido"),
  param("tagId").isMongoId().withMessage("ID de etiqueta inválido"),
];
