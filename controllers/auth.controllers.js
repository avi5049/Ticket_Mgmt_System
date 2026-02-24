import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, role_id } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role_id
    });

    res.status(200).json({msg: "OK"},user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({ msg: "Unauthorized email" });

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch)
      return res.status(401).json({ msg: "Unauthorized pass" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );


    res.status(200).json({msg: "OK", token} );

  } catch (error) {
    res.status(401).json({ msg: "Unauthorized" });
  }
};