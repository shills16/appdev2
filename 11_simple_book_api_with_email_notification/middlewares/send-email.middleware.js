// middlewares/send-email.middleware.js
const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');
require('dotenv').config();

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SENDER_EMAIL = process.env.SENDER_EMAIL;


  // Create transporter
const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
});

    const sendBookEmail = async (bookDetails, userEmail) => {
    const { title, author, year } = bookDetails;

    if (!title || !author || !year) {
        console.error("Book details are incomplete:", bookDetails);
    }

    if (!userEmail) {
        console.error("User email is not provided:", userEmail);
        return { 
            success: false, 
            message: "User email is not provided" 
        };
    }
    
    // Compile template
    const pugTemplatePath = path.join(__dirname, '../views/email-template.pug')
    const compiledFunction = pug.compileFile(pugTemplatePath);
    

    const htmlContent = compiledFunction({
        title: title,
        author: author,
        year: year,
        userEmail: userEmail,
    });


    // Email options
    const mailOptions = {
            from: `"${SENDER_EMAIL}" <${SENDER_EMAIL}>`,
            to: userEmail,
            subject: `Your book ${book.title} has been added!`,
            html: htmlContent,
    };
        
    try {
        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.messageId);
        return {
            success: true,
            message: info.messageId,
            urlPreview: nodemailer.getTestMessageUrl(info)
        };
    } catch (error) {
        console.error("Error sending email:", error);
    }};

module.exports = sendBookEmail;
