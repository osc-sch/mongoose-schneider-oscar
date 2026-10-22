import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

userSchema.virtual("profile", {
  ref: "Profile",
  localField: "_id",
  foreignField: "user_id",
  justOne: true,
});

userSchema.set("toJSON", { virtuals: true });

export const UserModel = model("User", userSchema);
