"use strict";


const recipient =
    document.getElementById("recipient");

const subject =
    document.getElementById("subject");

const message =
    document.getElementById("message");

const sendButton =
    document.getElementById("sendButton");

const statusBox =
    document.getElementById("status");

const fontSelector =
    document.getElementById("fontSelector");


/*
=========================================================
STATUS
=========================================================
*/

function showStatus(text, success = true) {

    statusBox.textContent =
        text;

    statusBox.style.background =
        success
            ? "rgba(52, 107, 69, .95)"
            : "rgba(130, 42, 52, .95)";

    statusBox.classList.add(
        "visible"
    );

    setTimeout(() => {

        statusBox.classList.remove(
            "visible"
        );

    }, 3500);

}


/*
=========================================================
GET MESSAGE TEXT
=========================================================
*/

function getMessageText() {

    return message.innerText
        .replace(/\n{3,}/g, "\n\n")
        .trim();

}


/*
=========================================================
SEND
=========================================================
*/

sendButton.addEventListener(
    "click",
    async () => {

        const to =
            recipient.value.trim();

        const subjectValue =
            subject.value.trim();

        const messageValue =
            getMessageText();


        if (!to) {

            showStatus(
                "Please enter a recipient.",
                false
            );

            recipient.focus();

            return;

        }


        if (!messageValue) {

            showStatus(
                "The letter is empty.",
                false
            );

            message.focus();

            return;

        }


        sendButton.disabled =
            true;

        sendButton.textContent =
            "Sending…";


        try {

            const response =
                await fetch(
                    "/send-letter",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({
                                to,
                                subject:
                                    subjectValue ||
                                    "A Little Love Letter For You ❤️",

                                message:
                                    messageValue
                            })
                    }
                );


            const result =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Sending failed."
                );

            }


            showStatus(
                "Letter sent successfully 💌",
                true
            );


        } catch (error) {

            console.error(error);

            showStatus(
                error.message ||
                "Unable to send the letter.",
                false
            );

        } finally {

            sendButton.disabled =
                false;

            sendButton.innerHTML =
                'Send <span>⌄</span>';

        }

    }
);


/*
=========================================================
BASIC FORMATTING
=========================================================
*/

document
    .querySelectorAll(
        "[data-command]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const command =
                    button.dataset.command;

                document.execCommand(
                    command,
                    false,
                    null
                );

                message.focus();

            }
        );

    });


/*
=========================================================
FONT SELECTOR
=========================================================
*/

fontSelector.addEventListener(
    "change",
    () => {

        document.execCommand(
            "fontName",
            false,
            fontSelector.value
        );

        message.focus();

    }
);
