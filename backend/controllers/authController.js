import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
 // Forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Send reset email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste it into your browser to complete the process:\n\n
        ${resetUrl}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Register a new user

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};