import { body } from "express-validator";

export const createTagValidation = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre de la etiqueta es obligatorio"),
  body("descripcion")
    .notEmpty()
    .withMessage("La descripción de la etiqueta es obligatoria"),
];
