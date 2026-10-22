import { body } from "express-validator";

export const registerValidation = [
  body("username")
    .notEmpty()
    .withMessage("el nombre de usuario es obligatorio"),
  body("email").notEmpty().withMessage("el correo electrónico es obligatorio"),
  body("password").notEmpty().withMessage("la contraseña es obligatoria"),
  body("profile.bio").optional(),
  body("profile.config").optional(),
];

export const updateValidation = [
  body("username").optional(),
  body("email").optional(),
  body("password").optional(),
  body("profile.bio").optional(),
  body("profile.config").optional(),
];
