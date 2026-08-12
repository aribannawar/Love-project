const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

module.exports = async (req, res) => {

    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method Not Allowed"
        });
    }

    try {

        // =====================================================
        // LOAD LOVE LETTER HTML
        // =====================================================

        const emailPath = path.join(
            process.cwd(),
            "love-letter",
            "public",
            "email.html"
        );

        const emailHtml = fs.readFileSync(
            emailPath,
            "utf8"
        );


        // =====================================================
        // GMAIL SMTP
        // =====================================================

        const transporter = nodemailer.createTransport({

            host: "smtp.gmail.com",

            port: 465,

            secure: true,

            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD
            }

        });


        // =====================================================
        // CHECK CONFIGURATION
        // =====================================================

        if (
            !process.env.GMAIL_USER ||
            !process.env.GMAIL_APP_PASSWORD ||
            !process.env.RECIPIENT_EMAIL
        ) {

            return res.status(500).json({
                success: false,
                message: "Email environment variables are not configured."
            });

        }


        // =====================================================
        // SEND LOVE LETTER
        // =====================================================

        const info = await transporter.sendMail({

            from: `"A Little Love Letter 💌" <${process.env.GMAIL_USER}>`,

            to: process.env.RECIPIENT_EMAIL,

            subject: "A Little Love Letter For You ❤️",

            html: emailHtml

        });


        // =====================================================
        // SUCCESS
        // =====================================================

        return res.status(200).json({

            success: true,

            message: "Love letter sent successfully! 💌",

            messageId: info.messageId

        });

    }


    catch (error) {

        console.error("Love letter sending failed:", error);

        return res.status(500).json({

            success: false,

            message: "Failed to send love letter."

        });

    }

};
