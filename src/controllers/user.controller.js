import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, profile } = matchedData(req, {
      locations: ["body"],
    });

    console.log({ username, email, password, profile });

    const user = await UserModel.create({ username, email, password });

    await ProfileModel.create({ user_id: user._id, ...profile });
    return res.status(201).json({ msg: "usuario registrado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({
      deletedAt: null,
    })
      .select("-password")
      .populate("profile", "config bio -_id -user_id");
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId)
      .select("-password")
      .populate("profile", "config bio -_id -user_id");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, password, profile } = matchedData(req, {
      locations: ["body"],
    });

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { username, email, password },
      { returnDocument: "after", runValidators: true },
    ).select("-password");

    const updatedProfile = await ProfileModel.findOneAndUpdate(
      { user_id: userId },
      { ...profile },
      { returnDocument: "after" },
    );

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({ user, profile: updatedProfile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findOneAndUpdate(
      {
        _id: userId,
        deletedAt: null,
      },
      {
        $set: { deletedAt: new Date() },
      },
      { returnDocument: "after" },
    );

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    return res.json({
      message: "Usuario desactivado",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
