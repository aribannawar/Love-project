const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 3000;

// email.js is /surprise/api/email.js
// ROOT therefore becomes /surprise
const ROOT = path.resolve(__dirname, "..");

function readFile(filename) {
    return fs.readFileSync(
        path.join(ROOT, filename)
    );
}


// -------------------------------------------------
// SEND LOVE LETTER
// -------------------------------------------------

async function sendLoveLetter() {

    const emailHtml = readFile("email.html").toString("utf8");

    const transporter = nodemailer.createTransport({

        host: "smtp.gmail.com",

        port: 465,

        secure: true,

        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD
        }

    });

    return await transporter.sendMail({

        from:
            `"A Little Love Letter 💌" <${process.env.GMAIL_USER}>`,

        to:
            process.env.RECIPIENT_EMAIL,

        subject:
            "A Little Love Letter For You ❤️",

        html:
            emailHtml

    });

}


// -------------------------------------------------
// REQUEST HANDLER
// -------------------------------------------------

async function handler(req, res) {

    // ---------------------------------------------
    // SEND EMAIL
    // ---------------------------------------------

    if (
        req.method === "POST" &&
        req.url === "/send-love-letter"
    ) {

        try {

            const info = await sendLoveLetter();

            res.writeHead(200, {

                "Content-Type":
                    "application/json; charset=utf-8",

                "Cache-Control":
                    "no-store"

            });

            res.end(JSON.stringify({

                success: true,

                message:
                    "Love letter sent successfully! 💌",

                messageId:
                    info.messageId

            }));

        } catch (error) {

            console.error(
                "Love letter sending failed:",
                error
            );

            res.writeHead(500, {

                "Content-Type":
                    "application/json; charset=utf-8",

                "Cache-Control":
                    "no-store"

            });

            res.end(JSON.stringify({

                success: false,

                message:
                    "Failed to send love letter."

            }));

        }

        return;
    }


    // ---------------------------------------------
    // EMAIL HTML
    // ---------------------------------------------

    if (
        req.method === "GET" &&
        req.url === "/email.html"
    ) {

        const html =
            readFile("email.html");

        res.writeHead(200, {

            "Content-Type":
                "text/html; charset=utf-8"

        });

        res.end(html);

        return;
    }


    // ---------------------------------------------
    // EMAIL CSS
    // ---------------------------------------------

    if (
        req.method === "GET" &&
        req.url === "/email.css"
    ) {

        const css =
            readFile("email.css");

        res.writeHead(200, {

            "Content-Type":
                "text/css; charset=utf-8"

        });

        res.end(css);

        return;
    }


    // ---------------------------------------------
    // NOT FOUND
    // ---------------------------------------------

    res.writeHead(404, {

        "Content-Type":
            "application/json; charset=utf-8"

    });

    res.end(JSON.stringify({

        success: false,

        message: "Not Found"

    }));

}


// -------------------------------------------------
// LOCAL NODE SERVER
// -------------------------------------------------

if (require.main === module) {

    const server =
        http.createServer(async (req, res) => {

            await handler(req, res);

        });

    server.listen(PORT, "0.0.0.0", () => {

        console.log(
            `Email server running at http://localhost:${PORT}`
        );

    });

}


// -------------------------------------------------
// VERCEL SERVERLESS FUNCTION
// -------------------------------------------------

module.exports = handler;
