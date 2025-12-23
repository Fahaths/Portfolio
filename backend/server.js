require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
    res.send('Backend Server is Running correctly!');
});

// Contact Route
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Transporter (Use your email provider credentials in .env)
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or another provider
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Send to yourself
        subject: `Portfolio Contact: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
