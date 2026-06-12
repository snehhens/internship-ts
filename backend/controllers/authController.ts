import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {
  validationResult
} from 'express-validator';

import {
  sendOTPEmail
} from '../utils/sendEmail';

import {
  Request,
  Response
} from 'express';

import User from '../models/User';
import {
  AuthenticatedRequest,
  JwtPayload
} from '../middleware/authMiddleware';

export const register = async (req: Request, res: Response) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    return res.status(400).json({
      errors: errors.array()
    });

  }

  try {

    const { email, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(409).json({
        message: "User already exists"
      });

    }

    const otp = Math.floor(
      1000 + Math.random() * 9000
    ).toString();

    const otpExpires =
      new Date(Date.now() + 5 * 60 * 1000);

    const user = new User({
      email,
      role,
      otp,
      otpExpires,
      isVerified: false
    });

    await user.save();

    await sendOTPEmail(
      email,
      otp
    );

    return res.status(201).json({
      message: "OTP sent successfully"
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error"
    });

  }

};

export const verifyOtp = async (req: Request, res: Response) => {

  try {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }



    if (!user.otpExpires || new Date() > user.otpExpires) {

      return res.status(400).json({
        message: "OTP Expired"
      });

    }



    if (String(user.otp) !== String(otp)) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    user.isVerified = true;

    await user.save();

    res.json({
      message: "OTP Verified Successfully"
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

export const resendOtp = async (req: Request, res: Response) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    const otp = Math.floor(
      1000 + Math.random() * 9000
    ).toString();

    const otpExpires =
      new Date(Date.now() + 5 * 60 * 1000);

    user.otp = otp;

    user.otpExpires = otpExpires;

    await user.save();

    await sendOTPEmail(
      email,
      otp
    );

    res.json({
      message: "OTP Resent Successfully"
    });

  } catch (error) {

    res.status(500).json(error);

  }

};

export const createPassword = async (req: Request, res: Response) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "OTP not verified"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    await user.save();

    res.json({
      message: "Password Created Successfully"
    });

  } catch (error) {
    res.status(500).json(error);
  }

};

export const login = async (req: Request, res: Response) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }

    const payload: JwtPayload = {
      userId: String(user._id)
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      message: "Login Successful",
      token,
      role: user.role,
      profileCompleted: user.profileCompleted
    });

  } catch (error) {
    res.status(500).json(error);
  }

};


export const getProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {

  try {

    const user = await User.findById(
      req.user?.userId
    );

    res.json(user);

  } catch (error) {

    res.status(500).json(error);

  }

};