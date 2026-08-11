/* =========================================================
   SURPRISE PROJECT
   TERMINAL MEMORY EXPERIENCE
   ========================================================= */

(() => {

    "use strict";


    const terminalOutput =
        document.getElementById("terminalOutput");

    const terminalCursor =
        document.getElementById("terminalCursor");

    const continueButton =
        document.getElementById("terminalContinue");


    if (
        !terminalOutput ||
        !continueButton
    ) {

        console.warn(
            "Terminal elements were not found."
        );

        return;

    }


    /* =====================================================
       TERMINAL SCRIPT
       ===================================================== */

    const sequence = [

        {
            type: "command",
            text: "> booting memory_terminal..."
        },

        {
            type: "muted",
            text: "[ OK ] memory system initialized"
        },

        {
            type: "muted",
            text: "[ OK ] constellation data loaded"
        },

        {
            type: "muted",
            text: "[ OK ] puzzle sequence completed"
        },

        {
            type: "command",
            text: "> searching memory archive..."
        },

        {
            type: "muted",
            text: "[ FOUND ] memories: many"
        },

        {
            type: "command",
            text: "> opening the most important file..."
        },

        {
            type: "highlight",
            text: "memory://the-person-who-makes-the-moments-special"
        },

        {
            type: "command",
            text: "> decrypting..."
        },

        {
            type: "muted",
            text: "[████████████████████] 100%"
        },

        {
            type: "command",
            text: "> rendering message..."
        },

        {
            type: "heart",
            text: "Some people become memories."
        },

        {
            type: "heart",
            text: "Some people become the reason"
        },

        {
            type: "heart",
            text: "the memories matter. ♥"
        },

        {
            type: "highlight",
            text: ""
        },

        {
            type: "highlight",
            text: "And this one was written especially for you."
        }

    ];


    /* =====================================================
       CONFIGURATION
       ===================================================== */

    const CHAR_DELAY = 18;

    const LINE_DELAY = 350;


    /* =====================================================
       CREATE LINE
       ===================================================== */

    function createLine(type) {

        const line =
            document.createElement("div");


        line.className =
            `terminal-line terminal-${type}`;


        terminalOutput.appendChild(
            line
        );


        return line;

    }


    /* =====================================================
       TYPE TEXT
       ===================================================== */

    function typeText(
        element,
        text
    ) {

        return new Promise(resolve => {

            let index = 0;


            function typeCharacter() {

                if (index >= text.length) {

                    resolve();

                    return;

                }


                element.textContent +=
                    text[index];


                index++;


                terminalOutput.scrollTop =
                    terminalOutput.scrollHeight;


                setTimeout(
                    typeCharacter,
                    CHAR_DELAY
                );

            }


            typeCharacter();

        });

    }


    /* =====================================================
       RUN TERMINAL
       ===================================================== */

    async function runTerminal() {

        for (
            const item of sequence
        ) {

            const line =
                createLine(item.type);


            await typeText(
                line,
                item.text
            );


            await new Promise(
                resolve =>
                    setTimeout(
                        resolve,
                        LINE_DELAY
                    )
            );

        }


        /*
         * Finished.
         */

        if (terminalCursor) {

            terminalCursor.style.display =
                "none";

        }


        continueButton.classList.add(
            "visible"
        );

    }


    /* =====================================================
       NEXT PAGE
       ===================================================== */

    function continueJourney() {

        document.body.style.transition =
            "opacity 0.8s ease";

        document.body.style.opacity =
            "0";


        setTimeout(() => {

            /*
             * Next stage will be the
             * interactive photo book.
             */

            window.location.href =
                "book.html";

        }, 800);

    }


    continueButton.addEventListener(
        "click",
        continueJourney
    );


    /* =====================================================
       START
       ===================================================== */

    runTerminal();

})();
