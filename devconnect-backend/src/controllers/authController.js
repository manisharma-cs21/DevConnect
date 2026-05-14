import User from "../models/userModels.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import validator from "validator";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

export const signup = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    // trim + normalize
    name = name?.trim();
    email = email?.trim().toLowerCase();
    password = password?.trim();

    // required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // email validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // strong password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must contain uppercase, number, special character",
      });
    }

    // check user exists
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user);

    res.status(201).json({
      message: "User Registered Successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email?.trim().toLowerCase();
    password = password?.trim();

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    // email format check
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// for  forget password

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // save token
    user.resetPasswordToken = resetToken;

    // expiry 10 mins
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    // reset url
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // message
    const message = `
Password Reset Link

${resetUrl}

This link will expire in 10 minutes.
`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      message,
    });

    res.status(200).json({
      message: "Reset link sent to email",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

//reset password will be handled in frontend by verifying token and then calling api to update password.

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // find user by token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    // token invalid
    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    // update password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    // clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
