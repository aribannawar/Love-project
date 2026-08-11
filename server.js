const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// =====================================================
// GMAIL SMTP CONFIGURATION
// =====================================================

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,

    auth: {
        user: "nawarariban161@gmail.com",
        pass: "wtjq czql oqae mjbr"
    }
});


// =====================================================
// LOAD EMAIL HTML
// =====================================================

const emailPath = path.join(
    __dirname,
    "love-letter",
    "public",
    "index.html"
);

const emailHtml = fs.readFileSync(
    emailPath,
    "utf8"
);


// =====================================================
// RECIPIENT
// =====================================================

const recipient =
    process.env.RECIPIENT_EMAIL;


// =====================================================
// SEND EMAIL
// =====================================================

async function sendLoveLetter() {

    try {

        console.log("Checking Gmail SMTP connection...");

        await transporter.verify();

        console.log("SMTP connection successful.");


        const info =
            await transporter.sendMail({

                from: `"A Little Love Letter 💌" <${process.env.GMAIL_USER}>`,

                to: "nawarxnura@gmail.com",

                subject:
                    "A Little Love Letter For You ❤️",

                html:
                    emailHtml

            });


        console.log("");
        console.log("💌 Love letter sent successfully!");
        console.log("Message ID:", info.messageId);
        console.log("Recipient:", recipient);

    }

    catch (error) {

        console.error("");
        console.error("❌ Failed to send email.");
        console.error(error);

    }

}


// =====================================================
// RUN
// =====================================================

sendLoveLetter();
