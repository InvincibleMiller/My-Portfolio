"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PW,
  },
});

export default async function sendMail(from, subject, text) {
  var mailOptions = {
    from: `${from} <${process.env.NODEMAILER_EMAIL}>`,
    to: process.env.PERSONAL_EMAIL,
    subject: subject,
    text: text,
  };

  return transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new Error(error);
    } else {
      console.log("Email Sent");
      return true;
    }
  });
}
