import { model, Schema, Types } from "mongoose";

const profileSchema = new Schema({
  user_id: { type: Types.ObjectId, ref: "User", required: true },
  bio: { type: String, maxlength: 250, default: "" },
  config: {
    private: { type: Boolean, default: false },
    notifications: { type: Boolean, default: true },
  },
});

export const ProfileModel = model("Profile", profileSchema);
