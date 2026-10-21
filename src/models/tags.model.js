import { model, Schema } from "mongoose";

const tagSchema = new Schema({
  nombre: { type: String, required: true, trim: true, unique: true },
  descripcion: { type: String, required: true, trim: true },
});

export const TagModel = model("Tag", tagSchema);
