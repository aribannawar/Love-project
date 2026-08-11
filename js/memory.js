/* =========================================================
   OLD MEMORIES
   INTERACTIVE MEMORY TEST
   ========================================================= */

(() => {

    "use strict";


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const memory =
        document.getElementById("memory");

    const memoryCard =
        document.getElementById("memoryCard");

    const memoryNumber =
        document.getElementById("memoryNumber");

    const memoryQuestion =
        document.getElementById("memoryQuestion");

    const memoryAnswers =
        document.getElementById("memoryAnswers");

    const memoryFeedback =
        document.getElementById("memoryFeedback");

    const memoryNext =
        document.getElementById("memoryNext");

    const memoryProgressBar =
        document.getElementById("memoryProgressBar");

    const memoryProgressText =
        document.getElementById("memoryProgressText");

    const memoryComplete =
        document.getElementById("memoryComplete");

    const memoryScore =
        document.getElementById("memoryScore");

    const memoryContinue =
        document.getElementById("memoryContinue");


    /* =====================================================
       ELEMENT CHECK
       ===================================================== */

    if (
        !memory ||
        !memoryCard ||
        !memoryNumber ||
        !memoryQuestion ||
        !memoryAnswers
    ) {

        console.warn(
            "Memory elements were not found."
        );

        return;

    }


    /* =====================================================
       MEMORY QUESTIONS
       ===================================================== */

    const memories = [

        {
            question:
                "How we were introduced first day?",

            answers: [
                "WhatsApp",
                "Facebook",
                "Instagram",
                "Others"
            ],

            correct: 0,

            success:
                "Yes. You remember how it all started. 👀",

            error:
                "Nope. Think back to the very beginning."
        },


        {
            question:
                "How had I found your number inbox 📥?",

            answers: [
                "Phone number",
                "Facebook group",
                "From others",
                "None of them"
            ],

            correct: 3,

            success:
                "Exactly. That's the answer I was looking for. 🌚",

            error:
                "Not this one. Think about how the number actually reached my inbox."
        },


        {
            question:
                "What was the time when we first ever introduced to each other 🕐?",

            answers: [
                "8.00 PM",
                "7.00 PM",
                "9.00 PM",
                "6.00 PM"
            ],

            correct: 1,

            success:
                "7.00 PM. One little timestamp from the beginning. 🕐",

            error:
                "Close your eyes and think about that first evening."
        },


        {
            question:
                "What was your first ever joke with me 🤧?",

            answers: [
                "You're my ex",
                "I'm human",
                "Coming your home",
                "A + C"
            ],

            correct: 3,

            success:
                "A + C. You actually remembered that one. 😂",

            error:
                "That wasn't the complete answer. Think about those first jokes."
        },


        {
            question:
                "Which was your first photo you sent me 🖼️?",

            answers: [
                "Black dress with eyeglass",
                "Red dress and open hair",
                "Clean view photo",
                "Blurry with blue dress on eyeglass"
            ],

            correct: 3,

            success:
                "Yes. That blurry blue-dress photo. 📷",

            error:
                "Not that one. Think about the very first photo."
        },


        {
            question:
                "Why did you send the photo to me?",

            answers: [
                "I asked to send",
                "From yourself",
                "To recognize you in college",
                "Other"
            ],

            correct: 2,

            success:
                "Exactly. It was so I could recognize you in college. 👀",

            error:
                "Think about why that first photo was actually sent."
        },


        {
            question:
                "What was your wish that I wanted to fill but you later dismissed?",

            answers: [
                "To have a flower",
                "To have some chocolates",
                "To take a picture",
                "Have foockha with you"
            ],

            correct: 0,

            success:
                "A flower. 🌹 That little wish really was there.",

            error:
                "Nope. Think about the little wish involving a flower."
        },


        {
            question:
                "Why you later dismissed to not accept that wish?",

            answers: [
                "You don't like me",
                "We're just newly introduced",
                "We're only friends, nothing else",
                "You could be in trouble if your friends see it"
            ],

            correct: 3,

            success:
                "That's the one. You were worried your friends might see it. 👀",

            error:
                "Think about what could have happened if your friends saw it."
        },


        {
            question:
                "What did we do when we first day introduced?",

            answers: [
                "Nothing much",
                "Gossip for few moments",
                "Chat all night long",
                "Fall asleep"
            ],

            correct: 2,

            success:
                "Chat all night long. Apparently we had a lot to say. 🌚",

            error:
                "Think about how long that first conversation actually lasted."
        },


        {
            question:
                "When I informed you about my ex for the first time 😪?",

            answers: [
                "When became friends",
                "When started becoming close",
                "After a very long time",
                "The night we're introduced"
            ],

            correct: 3,

            success:
                "Yes. That happened on the very night we were introduced. 😪",

            error:
                "Go all the way back to the first night."
        },


        {
            question:
                "When I clearly confirmed you that I am affectionated to you and became soulmate to you?",

            answers: [
                "2025, July",
                "2024 October",
                "2026 March",
                "2025 December"
            ],

            correct: 2,

            success:
                "2026 March. That memory made it all the way here. 💝",

            error:
                "Think about the month when everything became clear."
        }

    ];


    /* =====================================================
       STATE
       ===================================================== */

    let currentMemory = 0;

    let solved = false;

    let score = 0;


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    function init() {

        memory.classList.add(
            "is-entering"
        );

        updateMemory();

    }


    /* =====================================================
       PROGRESS
       ===================================================== */

    function updateProgress() {

        const current =
            currentMemory + 1;

        const total =
            memories.length;

        const percentage =
            (current / total) * 100;


        if (memoryProgressBar) {

            memoryProgressBar.style.width =
                `${percentage}%`;

        }


        if (memoryProgressText) {

            memoryProgressText.textContent =
                `${String(current).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

        }

    }


    /* =====================================================
       UPDATE MEMORY QUESTION
       ===================================================== */

    function updateMemory() {

        const data =
            memories[currentMemory];


        solved =
            false;


        memoryNumber.textContent =
            `QUESTION ${currentMemory + 1} OF ${memories.length}`;


        memoryQuestion.textContent =
            data.question;


        memoryFeedback.textContent =
            "";


        memoryFeedback.className =
            "memory-feedback";


        memoryNext.classList.remove(
            "visible"
        );


        memoryAnswers.innerHTML =
            "";


        updateProgress();


        /* =================================================
           CREATE ANSWER BUTTONS
           ================================================= */

        data.answers.forEach(
            (answer, index) => {

                const button =
                    document.createElement("button");


                button.type =
                    "button";


                button.className =
                    "memory-answer";


                button.textContent =
                    `${String.fromCharCode(65 + index)}. ${answer}`;


                button.dataset.index =
                    index;


                button.addEventListener(
                    "click",
                    () => {

                        checkAnswer(
                            index,
                            button
                        );

                    }
                );


                memoryAnswers.appendChild(
                    button
                );

            }
        );

    }


    /* =====================================================
       CHECK ANSWER
       ===================================================== */

    function checkAnswer(
        selectedIndex,
        selectedButton
    ) {

        if (solved) {

            return;

        }


        const data =
            memories[currentMemory];


        /* =================================================
           CORRECT
           ================================================= */

        if (
            selectedIndex ===
            data.correct
        ) {

            solved =
                true;

            score++;


            selectedButton.classList.add(
                "correct"
            );


            memoryFeedback.textContent =
                data.success;


            memoryFeedback.classList.add(
                "success"
            );


            disableAnswers();


            setTimeout(() => {

                memoryNext.classList.add(
                    "visible"
                );

            }, 450);

        }


        /* =================================================
           WRONG
           ================================================= */

        else {

            selectedButton.classList.add(
                "wrong"
            );


            memoryFeedback.textContent =
                data.error;


            memoryFeedback.classList.add(
                "error"
            );


            setTimeout(() => {

                selectedButton.classList.remove(
                    "wrong"
                );

            }, 450);

        }

    }


    /* =====================================================
       DISABLE ANSWERS
       ===================================================== */

    function disableAnswers() {

        const buttons =
            memoryAnswers.querySelectorAll(
                ".memory-answer"
            );


        buttons.forEach(
            button => {

                button.disabled =
                    true;

                button.style.cursor =
                    "default";

            }
        );

    }


    /* =====================================================
       NEXT MEMORY
       ===================================================== */

    function nextMemory() {

        if (!solved) {

            return;

        }


        /* =================================================
           MORE QUESTIONS
           ================================================= */

        if (
            currentMemory <
            memories.length - 1
        ) {

            memoryCard.style.transition =
                "opacity .35s ease, transform .35s ease";


            memoryCard.style.opacity =
                "0";


            memoryCard.style.transform =
                "translateY(-12px)";


            setTimeout(() => {

                currentMemory++;


                updateMemory();


                memoryCard.style.transform =
                    "translateY(12px)";


                requestAnimationFrame(() => {

                    requestAnimationFrame(() => {

                        memoryCard.style.transition =
                            "opacity .45s ease, transform .45s ease";


                        memoryCard.style.opacity =
                            "1";


                        memoryCard.style.transform =
                            "translateY(0)";

                    });

                });

            }, 350);

        }


        /* =================================================
           LAST QUESTION
           ================================================= */

        else {

            completeMemory();

        }

    }


    /* =====================================================
       COMPLETE MEMORY TEST
       ===================================================== */

    function completeMemory() {

        memoryCard.style.transition =
            "opacity .5s ease, transform .5s ease";


        memoryCard.style.opacity =
            "0";


        memoryCard.style.transform =
            "scale(.97)";


        setTimeout(() => {

            memoryCard.style.display =
                "none";


            memoryComplete.classList.add(
                "visible"
            );


            if (memoryProgressBar) {

                memoryProgressBar.style.width =
                    "100%";

            }


            if (memoryProgressText) {

                memoryProgressText.textContent =
                    `${String(memories.length).padStart(2, "0")} / ${String(memories.length).padStart(2, "0")}`;

            }


            if (memoryScore) {

                memoryScore.textContent =
                    `${score} / ${memories.length}`;

            }

        }, 500);

    }


    /* =====================================================
       CONTINUE JOURNEY
       ===================================================== */

    function continueJourney() {

        memory.classList.add(
            "is-exiting"
        );


        setTimeout(() => {

            /*
             * Change this filename if the
             * next page in your journey has
             * another filename.
             */

            window.location.href =
                "terminal.html";

        }, 850);

    }


    /* =====================================================
       BUTTON EVENTS
       ===================================================== */

    if (memoryNext) {

        memoryNext.addEventListener(
            "click",
            nextMemory
        );

    }


    if (memoryContinue) {

        memoryContinue.addEventListener(
            "click",
            continueJourney
        );

    }


    /* =====================================================
       START
       ===================================================== */

    init();

})();
