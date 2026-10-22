import { body } from "express-validator";

export const createPostValidation = [
  body("title").notEmpty().withMessage("El título es obligatorio"),
  body("content").notEmpty().withMessage("El contenido es obligatorio"),
  body("author").notEmpty().withMessage("El autor es obligatorio"),
];

export const updatePostValidation = [
  body("title").optional(),
  body("content").optional(),
    body("author").optional(),
  
];
