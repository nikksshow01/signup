// controllers/authController.js (ESM)
import bcrypt from "bcryptjs";
import User from "../models/Users.js";

/**
 * Signup controller
 * Expects: req.body = { fname, lname, phone, email, password }
 */
export const signup = async (req, res, next) => {
  try {
    const { fname, lname, phone, email, password } = req.body;

    // basic server-side validation
    if (!fname || !lname || !phone || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = new User({
      fname,
      lname,
      phone,
      email,
      password: hashed
    });

    await user.save();

    // do NOT send password back
    return res.status(201).json({
      message: "User created",
      user: {
        id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (err) {
    next(err);
  }
};