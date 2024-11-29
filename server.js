require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");




const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());
// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});




app.post('/send-email', async (req, res) => {
  const {
    businessLocation,
    firstName,
    lastName,
    companyName,
    companyWebsite,
    companyEmail,
    phoneNumber,
    learnAbout,
    howCanHelp,
  } = req.body;

  const emailContent = `
    <h2>New Quote Request</h2>
    <p><strong>Business Location:</strong> ${businessLocation}</p>
    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Company:</strong> ${companyName}</p>
    <p><strong>Website:</strong> ${companyWebsite}</p>
    <p><strong>Email:</strong> ${companyEmail}</p>
    <p><strong>Phone:</strong> ${phoneNumber}</p>
    <p><strong>Learned About:</strong> ${learnAbout || 'N/A'}</p>
    <p><strong>How Can We Help:</strong> ${howCanHelp || 'N/A'}</p>
  `;

  try {
    await transporter.sendMail({
      from: `"${firstName} ${lastName}" <${companyEmail}>`,
      to: companyEmail, // Change to the recipient's email
      subject: 'New Get a Quote Request',
      html: emailContent,
    });

    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});




// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
