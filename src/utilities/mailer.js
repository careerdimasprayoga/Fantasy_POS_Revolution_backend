"use strict";
const nodemailer = require("nodemailer");

module.exports = {
  send: async (target_email, subject, text, html_text) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "badag.corp@gmail.com",
        pass: "odading21",
      },
    });

    try {
      let info = await transporter.sendMail({
        from: '"Mama Dede 👻" <foo@example.com>',
        to: target_email,
        subject: subject,
        text: text,
        html: html_text,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
