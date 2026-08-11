"use strict";

const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

/*
=========================================================
GMAIL TRANSPORT
=========================================================
*/

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user:"nawarariban161@gmail.com",
        pass:"wtjq czql oqae mjbr"
    }
});

/*
=========================================================
SEND LOVE LETTER
=========================================================
*/

app.post("/send-letter", async (req, res) => {

    try {

        const {
            to,
            subject,
            message
        } = req.body;

        if (!to || !subject || !message) {

            return res.status(400).json({
                success: false,
                message: "Recipient, subject and message are required."
            });

        }

        const mail = {
            from: `"A Little Love Letter 💌" <${process.env.GMAIL_USER}>`,

            to: to,

            subject: subject,

            text: message,

            html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>

<body style="
    margin:0;
    padding:0;
    background:#24151a;
    font-family:Georgia,serif;
">

<div style="
    max-width:700px;
    margin:30px auto;
    background:#f6eee4;
    padding:45px;
    border-radius:12px;
    color:#38272a;
    box-shadow:0 15px 50px rgba(0,0,0,.35);
">

    <h1 style="
        text-align:center;
        color:#a93d57;
        font-weight:normal;
    ">
        A Little Love Letter 💌
    </h1>

    <div style="
        height:1px;
        background:#c9a9a9;
        margin:25px 0;
    "></div>

    <div style="
        white-space:pre-line;
        font-size:17px;
        line-height:1.9;
    ">
${escapeHtml(message)}
    </div>

    <div style="
        margin-top:35px;
        text-align:center;
        color:#b24a64;
        font-size:22px;
    ">
        ❤️
    </div>

</div>

</body>
</html>
            `
        };

        await transporter.sendMail(mail);

        console.log(
            `Email sent successfully to ${to}`
        );

        res.json({
            success: true,
            message: "Your letter has been sent successfully 💌"
        });

        } catch (error) {

        console.error(
            "Email error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "The email could not be sent."
        });

    }

});


/*
=========================================================
HTML ESCAPE
=========================================================
*/

function escapeHtml(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/*
=========================================================
START SERVER
=========================================================
*/

app.listen(PORT, () => {

    console.log(
        `Love Letter server running at http://localhost:8000`
    );

});
