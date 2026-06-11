import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';





const transporter = nodemailer.createTransport({

  service: 'gmail',

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }

});

export const sendOTPEmail = async (

  email: string,
  otp: string

) => {

  await transporter.sendMail({

    from: process.env.EMAIL_USER,

    to: email,

    subject: 'Your Verification OTP',

    html: `
      <h2>Email Verification</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP expires in 10 minutes.</p>
    `

  });

};