/* =========================================================
   SURPRISE PROJECT
   INTERACTIVE MEMORY PUZZLE
   ========================================================= */

(() => {

    "use strict";


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const puzzle =
        document.getElementById("puzzle");

    const puzzleCard =
        document.getElementById("puzzleCard");

    const puzzleNumber =
        document.getElementById("puzzleNumber");

    const puzzleQuestion =
        document.getElementById("puzzleQuestion");

    const puzzleAnswers =
        document.getElementById("puzzleAnswers");

    const puzzleFeedback =
        document.getElementById("puzzleFeedback");

    const puzzleNext =
        document.getElementById("puzzleNext");

    const progressBar =
        document.getElementById("puzzleProgressBar");

    const progressText =
        document.getElementById("puzzleProgressText");

    const puzzleComplete =
        document.getElementById("puzzleComplete");

    const puzzleContinue =
        document.getElementById("puzzleContinue");


    if (
        !puzzle ||
        !puzzleCard ||
        !puzzleQuestion ||
        !puzzleAnswers
    ) {

        console.warn(
            "Puzzle elements were not found."
        );

        return;

    }


    /* =====================================================
       PUZZLE DATA
       ===================================================== */

    const puzzles = [

        {
            question:
                "What makes an ordinary moment become a special memory?",

            answers: [
                "The place",
                "The people",
                "The weather",
                "The moment itself"
            ],

            correct: 1,

            success:
                "Exactly. The right person can turn an ordinary moment into something unforgettable.",

            error:
                "Not quite. Think about who makes the memory meaningful."
        },


        {
            question:
                "If a memory could be represented by one color, what would make that color special?",

            answers: [
                "Its brightness",
                "The emotion behind it",
                "Its rarity",
                "Its name"
            ],

            correct: 1,

            success:
                "That's the clue. A memory gets its meaning from the feeling attached to it.",

            error:
                "Look beyond the surface. Think about the feeling behind the memory."
        },


        {
            question:
                "What is more valuable than a perfect photograph?",

            answers: [
                "A better camera",
                "A larger album",
                "The memory behind it",
                "A higher resolution"
            ],

            correct: 2,

            success:
                "You found the final piece. The photograph is only the frame—the memory is the real treasure.",

            error:
                "Think beyond the photograph itself."
        }

    ];


    /* =====================================================
       STATE
       ===================================================== */

    let currentPuzzle = 0;

    let solved = false;


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    function init() {

        puzzle.classList.add(
            "is-entering"
        );

        updatePuzzle();

    }


    /* =====================================================
       UPDATE PROGRESS
       ===================================================== */

    function updateProgress() {

        const current =
            currentPuzzle + 1;

        const total =
            puzzles.length;


        const percentage =
            (current / total) * 100;


        if (progressBar) {

            progressBar.style.width =
                `${percentage}%`;

        }


        if (progressText) {

            progressText.textContent =
                `${String(current).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

        }

    }


    /* =====================================================
       UPDATE QUESTION
       ===================================================== */

    function updatePuzzle() {

        const data =
            puzzles[currentPuzzle];


        solved = false;


        puzzleNumber.textContent =
            String(currentPuzzle + 1)
                .padStart(2, "0");


        puzzleQuestion.textContent =
            data.question;


        puzzleFeedback.textContent =
            "";


        puzzleFeedback.className =
            "puzzle-feedback";


        puzzleNext.classList.remove(
            "visible"
        );


        puzzleAnswers.innerHTML =
            "";


        updateProgress();


        /*
         * Create answer buttons.
         */

        data.answers.forEach(
            (answer, index) => {

                const button =
                    document.createElement("button");


                button.type =
                    "button";


                button.className =
                    "puzzle-answer";


                button.textContent =
                    answer;


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


                puzzleAnswers.appendChild(
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

        /*
         * Prevent answering the same
         * puzzle multiple times.
         */

        if (solved) {

            return;

        }


        const data =
            puzzles[currentPuzzle];


        if (
            selectedIndex ===
            data.correct
        ) {

            solved = true;


            selectedButton.classList.add(
                "correct"
            );


            puzzleFeedback.textContent =
                data.success;


            puzzleFeedback.classList.add(
                "success"
            );


            /*
             * Disable all answers.
             */

            disableAnswers();


            /*
             * Show next button.
             */

            setTimeout(() => {

                puzzleNext.classList.add(
                    "visible"
                );

            }, 450);

        }

        else {

            selectedButton.classList.add(
                "wrong"
            );


            puzzleFeedback.textContent =
                data.error;


            puzzleFeedback.classList.add(
                "error"
            );


            /*
             * Remove wrong state after
             * the shake animation.
             */

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
            puzzleAnswers.querySelectorAll(
                ".puzzle-answer"
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
       NEXT PUZZLE
       ===================================================== */

    function nextPuzzle() {

        if (!solved) {

            return;

        }


        if (
            currentPuzzle <
            puzzles.length - 1
        ) {

            /*
             * Card outro.
             */

            puzzleCard.style.transition =
                "opacity 0.35s ease, transform 0.35s ease";

            puzzleCard.style.opacity =
                "0";

            puzzleCard.style.transform =
                "translateY(-12px)";


            setTimeout(() => {

                currentPuzzle++;


                updatePuzzle();


                puzzleCard.style.transform =
                    "translateY(12px)";


                requestAnimationFrame(() => {

                    requestAnimationFrame(() => {

                        puzzleCard.style.transition =
                            "opacity 0.45s ease, transform 0.45s ease";

                        puzzleCard.style.opacity =
                            "1";

                        puzzleCard.style.transform =
                            "translateY(0)";

                    });

                });

            }, 350);

        }

        else {

            completePuzzle();

        }

    }


    /* =====================================================
       COMPLETE PUZZLE
       ===================================================== */

    function completePuzzle() {

        puzzleCard.style.transition =
            "opacity 0.5s ease, transform 0.5s ease";

        puzzleCard.style.opacity =
            "0";

        puzzleCard.style.transform =
            "scale(0.97)";


        setTimeout(() => {

            puzzleCard.style.display =
                "none";


            puzzleComplete.classList.add(
                "visible"
            );


            if (progressBar) {

                progressBar.style.width =
                    "100%";

            }

            if (progressText) {

                progressText.textContent =
                    "03 / 03";

            }

        }, 500);

    }


    /* =====================================================
       CONTINUE TO NEXT PAGE
       ===================================================== */

    function continueJourney() {

        puzzle.classList.add(
            "is-exiting"
        );


        setTimeout(() => {

            /*
             * The terminal page will be created
             * next.
             */

            window.location.href =
                "memory.html";

        }, 850);

    }


    /* =====================================================
       BUTTON EVENTS
       ===================================================== */

    if (puzzleNext) {

        puzzleNext.addEventListener(
            "click",
            nextPuzzle
        );

    }


    if (puzzleContinue) {

        puzzleContinue.addEventListener(
            "click",
            continueJourney
        );

    }


    /* =====================================================
       INITIAL START
       ===================================================== */

    init();

})();
