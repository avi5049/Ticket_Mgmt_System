import User from "../models/users.model.js";
import bcrypt from "bcryptjs";

export const createuser = async (req, res) => {
  try {
    // const user = req.user;
    // if (!"MANAGER".includes(user.role)) {
    //   return res.status(401).json({
    //     msg: "Unauthorized",
    //   });
    // }
    const { name, email, password, role_id } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role_id
    });

    res.status(201).json({ msg: "Created" ,newUser});
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
