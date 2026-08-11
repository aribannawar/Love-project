/* =========================================================
   3D MEMORY BOOK
   book.js
   CLEAN FINAL VERSION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const book =
        document.getElementById("book");

    const bookCover =
        document.getElementById("bookCover");

    const pages = [
        ...document.querySelectorAll(
            ".book-page.photo-page"
        )
    ];

    const prevButton =
        document.getElementById("prevPage");

    const nextButton =
        document.getElementById("nextPage");

    const pageCounter =
        document.getElementById("pageCounter");

    const bookHint =
        document.getElementById("bookHint");

    const bookReturn =
        document.getElementById("bookReturn");

    let takeFlower =
        document.getElementById("takeFlower");

    let rejectFlower =
        document.getElementById("rejectFlower");

    const finalMessage =
        document.getElementById("finalSurpriseMessage");

    const cursorHint =
        document.getElementById("cursorHint");


    /* =====================================================
       STATE
       ===================================================== */

    const TOTAL_PAGES = 13;

    let currentPage = 0;
    let bookOpened = false;
    let isAnimating = false;

    let cursorHintTimer = null;

    let cursorVisible = false;
    let draggingCursor = false;

    let cursorX =
        window.innerWidth / 2;

    let cursorY =
        window.innerHeight / 2;

    let rejectX = 0;
    let rejectY = 0;

    let finalInteractionEnabled = false;

    let rejectEscapeCount = 0;

    let pandaShown = false;
    let pandaAnimationRunning = false;

    let pandaElement = null;

    /*
     * Panda now waits 5 seconds after the Reject
     * button starts escaping.
     */
    let pandaDelayTimer = null;


    /* =====================================================
       FIND FINAL PAGES
       ===================================================== */

    const finalPage =
        document.querySelector(".page-13") ||
        document.querySelector(
            '[data-page="13"]'
        );

    const page12 =
        document.querySelector(".page-12") ||
        document.querySelector(
            '[data-page="12"]'
        );


    /* =====================================================
       REMOVE OLD / OUTSIDE FLOWER BUTTONS
       ===================================================== */

    /*
     * Keep only the Take Flower button that belongs
     * to Page 12 and only the Reject button that belongs
     * to Page 13.
     *
     * Any old duplicate buttons outside those pages
     * are removed.
     */

    const correctTakeFlower =
        page12
            ? (
                page12.querySelector("#takeFlower") ||
                page12.querySelector(".take-flower")
            )
            : null;

    const correctRejectFlower =
        finalPage
            ? (
                finalPage.querySelector("#rejectFlower") ||
                finalPage.querySelector(".reject-flower")
            )
            : null;


    document.querySelectorAll(
        ".take-flower"
    ).forEach(button => {

        if (
            button !== correctTakeFlower
        ) {
            button.remove();
        }
    });


    document.querySelectorAll(
        ".reject-flower"
    ).forEach(button => {

        if (
            button !== correctRejectFlower
        ) {
            button.remove();
        }
    });


    if (correctTakeFlower) {

        takeFlower =
            correctTakeFlower;
    }


    if (correctRejectFlower) {

        rejectFlower =
            correctRejectFlower;
    }


    /* =====================================================
       PAGE INITIALIZATION
       ===================================================== */

    pages.forEach((page, index) => {

        const pageNumber =
            Number(page.dataset.page) ||
            index + 1;

        page.style.zIndex =
            String(
                TOTAL_PAGES -
                pageNumber +
                10
            );

        page.style.transformOrigin =
            "left center";

        page.style.transformStyle =
            "preserve-3d";

        page.style.backfaceVisibility =
            "hidden";

        page.style.webkitBackfaceVisibility =
            "hidden";
    });


    /* =====================================================
       CUSTOM CURSOR
       ===================================================== */

    const cursor =
        document.createElement("div");

    cursor.className =
        "drag-cursor";

    cursor.setAttribute(
        "aria-hidden",
        "true"
    );

    cursor.innerHTML = `
        <div class="drag-cursor-inner">
            ☝🏻
        </div>
    `;

    document.body.appendChild(cursor);


    /* =====================================================
       CURSOR POSITION
       ===================================================== */

    function setCursorPosition(x, y) {

        cursorX = x;
        cursorY = y;

        cursor.style.left =
            `${x}px`;

        cursor.style.top =
            `${y}px`;
    }


    /* =====================================================
       CURSOR VISIBILITY
       ===================================================== */

    function showCursor() {

        cursor.classList.add(
            "visible"
        );

        cursorVisible = true;
    }


    function hideCursor() {

        cursor.classList.remove(
            "visible"
        );

        cursorVisible = false;
    }


    /* =====================================================
       CURSOR HINT
       ===================================================== */

    function updateCursorHint() {

        if (!cursorHint) {
            return;
        }

        if (cursorHintTimer) {

            clearTimeout(
                cursorHintTimer
            );

            cursorHintTimer = null;
        }

        if (
            currentPage !== TOTAL_PAGES
        ) {

            cursorHint.classList.remove(
                "visible"
            );

            cursorHint.setAttribute(
                "aria-hidden",
                "true"
            );

            return;
        }

        cursorHint.classList.add(
            "visible"
        );

        cursorHint.setAttribute(
            "aria-hidden",
            "false"
        );

        cursorHintTimer =
            setTimeout(() => {

                cursorHint.classList.remove(
                    "visible"
                );

                cursorHint.setAttribute(
                    "aria-hidden",
                    "true"
                );

                cursorHintTimer = null;

            }, 3000);
    }


    /* =====================================================
       PAGE COUNTER
       ===================================================== */

    function updateCounter() {

        if (!pageCounter) {
            return;
        }

        if (!bookOpened) {

            pageCounter.textContent =
                "COVER";

            return;
        }

        pageCounter.textContent =
            `${currentPage} / ${TOTAL_PAGES}`;
    }


    /* =====================================================
       CONTROLS
       ===================================================== */

    function updateControls() {

        if (
            !prevButton ||
            !nextButton
        ) {
            return;
        }

        if (!bookOpened) {

            prevButton.disabled = true;
            nextButton.disabled = false;

            return;
        }

        prevButton.disabled =
            currentPage <= 1 ||
            isAnimating;

        nextButton.disabled =
            currentPage >= TOTAL_PAGES ||
            isAnimating;
    }


    /* =====================================================
       FINAL TWO-PAGE SPREAD
       ===================================================== */

    function openFinalSpread() {

        if (!book) return;

        book.classList.add("final-spread");

        if (page12) {

            page12.classList.add(
                "spread-left-page"
            );

            page12.classList.remove(
                "page-turned"
            );
        }

        if (finalPage) {

            finalPage.classList.add(
                "spread-right-page"
            );

            finalPage.classList.remove(
                "page-turned"
            );
        }
    }


    function closeFinalSpread() {

        if (!book) return;

        book.classList.remove(
            "final-spread"
        );

        if (page12) {

            page12.classList.remove(
                "spread-left-page"
            );
        }

        if (finalPage) {

            finalPage.classList.remove(
                "spread-right-page"
            );
        }
    }


    /* =====================================================
       OPEN BOOK
       ===================================================== */

    function openBook() {

        if (bookOpened) {
            return;
        }

        if (isAnimating) {
            return;
        }

        isAnimating = true;

        bookOpened = true;

        currentPage = 1;

        if (bookCover) {

            bookCover.classList.add(
                "page-turned"
            );
        }

        if (bookHint) {

            bookHint.textContent =
                "USE THE ARROWS TO TURN THE PAGES";
        }

        setTimeout(() => {

            isAnimating = false;

            updateCounter();
            updateControls();
            updateCursorHint();

        }, 1100);
    }


    /* =====================================================
       NEXT PAGE
       ===================================================== */

    function nextPage() {

        if (!bookOpened) {

            openBook();
            return;
        }

        if (isAnimating) {
            return;
        }

        if (
            currentPage >= TOTAL_PAGES
        ) {
            return;
        }


        /*
         * FINAL TRANSITION
         *
         * Page 12 stays visible.
         * Page 12 + Page 13 become the
         * final two-page spread.
         */

        if (
            currentPage ===
            TOTAL_PAGES - 1
        ) {

            isAnimating = true;

            currentPage =
                TOTAL_PAGES;

            openFinalSpread();

            updateCounter();
            updateControls();

            setTimeout(() => {

                isAnimating = false;

                enableFinalInteraction();

                updateControls();
                updateCursorHint();

            }, 850);

            return;
        }


        isAnimating = true;

        const page =
            pages[currentPage - 1];

        if (page) {

            page.classList.add(
                "page-turned"
            );
        }

        currentPage++;

        updateCounter();
        updateControls();

        setTimeout(() => {

            isAnimating = false;

            updateControls();
            updateCursorHint();

        }, 1080);
    }


    /* =====================================================
       PREVIOUS PAGE
       ===================================================== */

    function previousPage() {

        if (!bookOpened) {
            return;
        }

        if (isAnimating) {
            return;
        }

        if (currentPage <= 1) {
            return;
        }


        /*
         * Leave final spread.
         */

        if (
            currentPage ===
            TOTAL_PAGES
        ) {

            isAnimating = true;

            disableFinalInteraction();

            closeFinalSpread();

            currentPage =
                TOTAL_PAGES - 1;

            updateCounter();
            updateControls();

            setTimeout(() => {

                isAnimating = false;

                updateControls();
                updateCursorHint();

            }, 700);

            return;
        }


        isAnimating = true;

        const page =
            pages[currentPage - 2];

        if (page) {

            page.classList.remove(
                "page-turned"
            );
        }

        currentPage--;

        disableFinalInteraction();

        updateCounter();
        updateControls();

        setTimeout(() => {

            isAnimating = false;

            updateControls();
            updateCursorHint();

        }, 1080);
    }


    /* =====================================================
       FINAL INTERACTION
       ===================================================== */

    function enableFinalInteraction() {

        finalInteractionEnabled = true;

        rejectEscapeCount = 0;

        pandaShown = false;

        pandaAnimationRunning = false;


        /*
         * Reset panda timer.
         */

        if (pandaDelayTimer) {

            clearTimeout(
                pandaDelayTimer
            );

            pandaDelayTimer = null;
        }


        if (pandaElement) {

            pandaElement.remove();

            pandaElement = null;
        }


        if (cursorHintTimer) {

            clearTimeout(
                cursorHintTimer
            );

            cursorHintTimer = null;
        }


        showCursor();


        setCursorPosition(
            window.innerWidth / 2,
            window.innerHeight - 170
        );


        /*
         * SHOW BOTH BUTTONS ONLY ON PAGE 13.
         */

        if (takeFlower) {

            takeFlower.style.opacity =
                "1";

            takeFlower.style.visibility =
                "visible";

            takeFlower.style.pointerEvents =
                "none";

            takeFlower.classList.remove(
                "cursor-near"
            );

            takeFlower.style.transform =
                "";
        }


        if (rejectFlower) {

            rejectFlower.style.opacity =
                "1";

            rejectFlower.style.visibility =
                "visible";

            rejectFlower.style.pointerEvents =
                "none";

            rejectFlower.style.position =
                "fixed";

            rejectX = 0;
            rejectY = 0;

            rejectFlower.style.left =
                "";

            rejectFlower.style.top =
                "";
        }


        updateCursorHint();
    }


    function disableFinalInteraction() {

        finalInteractionEnabled = false;

        draggingCursor = false;

        cursor.classList.remove(
            "dragging"
        );

        hideCursor();


        if (cursorHintTimer) {

            clearTimeout(
                cursorHintTimer
            );

            cursorHintTimer = null;
        }


        if (pandaDelayTimer) {

            clearTimeout(
                pandaDelayTimer
            );

            pandaDelayTimer = null;
        }


        if (cursorHint) {

            cursorHint.classList.remove(
                "visible"
            );

            cursorHint.setAttribute(
                "aria-hidden",
                "true"
            );
        }


        rejectEscapeCount = 0;

        pandaShown = false;

        pandaAnimationRunning = false;


        if (pandaElement) {

            pandaElement.remove();

            pandaElement = null;
        }


        /*
         * HIDE BOTH BUTTONS WHEN NOT ON PAGE 13.
         */

        if (takeFlower) {

            takeFlower.style.opacity =
                "0";

            takeFlower.style.visibility =
                "hidden";

            takeFlower.style.pointerEvents =
                "none";

            takeFlower.classList.remove(
                "cursor-near"
            );

            takeFlower.style.transform =
                "";
        }


        if (rejectFlower) {

            rejectFlower.style.opacity =
                "0";

            rejectFlower.style.visibility =
                "hidden";

            rejectFlower.style.pointerEvents =
                "none";
        }
    }


    /* =====================================================
       REJECT BUTTON POSITION
       ===================================================== */

    function positionRejectButton(
        forceRandom = false
    ) {

        if (!rejectFlower) {
            return;
        }

        if (!finalPage) {
            return;
        }


        /*
         * Use the actual Page 13 rectangle.
         *
         * The Reject button is positioned with
         * viewport coordinates so old parent
         * positioning cannot push it outside
         * the book.
         */

        const pageRect =
            finalPage.getBoundingClientRect();

        const buttonRect =
            rejectFlower.getBoundingClientRect();


        /*
         * Keep the button safely inside
         * the right page.
         */

        const padding = 18;


        const minX =
            pageRect.left +
            padding;

        const maxX =
            pageRect.right -
            buttonRect.width -
            padding;


        const minY =
            pageRect.top +
            padding;

        const maxY =
            pageRect.bottom -
            buttonRect.height -
            padding;


        if (
            maxX <= minX ||
            maxY <= minY
        ) {
            return;
        }


        /*
         * Don't move until Reject has
         * actually started escaping.
         */

        if (
            !forceRandom &&
            rejectEscapeCount === 0
        ) {
            return;
        }


        rejectX =
            minX +
            Math.random() *
            (maxX - minX);

        rejectY =
            minY +
            Math.random() *
            (maxY - minY);


        rejectFlower.style.position =
            "fixed";

        rejectFlower.style.left =
            `${rejectX}px`;

        rejectFlower.style.top =
            `${rejectY}px`;
    }


    /* =====================================================
       PANDA DELAY
       ===================================================== */

    function startPandaDelay() {

        /*
         * Only start this timer once.
         */

        if (
            pandaDelayTimer ||
            pandaShown ||
            pandaAnimationRunning
        ) {
            return;
        }


        pandaDelayTimer =
            setTimeout(() => {

                pandaDelayTimer = null;

                if (
                    !finalInteractionEnabled ||
                    pandaShown
                ) {
                    return;
                }

                showPandaMessage();

            }, 5000);
    }


    /* =====================================================
       REJECT ESCAPE
       ===================================================== */

    function escapeRejectButton() {

        if (
            !finalInteractionEnabled
        ) {
            return;
        }


        rejectEscapeCount++;


        /*
         * Start the 5-second panda countdown
         * when Reject first begins escaping.
         */

        startPandaDelay();


        /*
         * Move Reject rapidly inside Page 13.
         */

        positionRejectButton(true);
    }


    /* =====================================================
       CREATE HOLOGRAPHIC PANDA
       ===================================================== */

    function createPanda() {

        const panda =
            document.createElement("div");

        panda.className =
            "holographic-panda";

        panda.setAttribute(
            "aria-hidden",
            "true"
        );


        panda.innerHTML = `

            <div class="panda-glow"></div>

            <div class="panda-shadow"></div>

            <div class="panda-body">

                <div class="panda-ear panda-ear-left"></div>

                <div class="panda-ear panda-ear-right"></div>

                <div class="panda-head">

                    <div class="panda-eye panda-eye-left">
                        <span></span>
                    </div>

                    <div class="panda-eye panda-eye-right">
                        <span></span>
                    </div>

                    <div class="panda-nose"></div>

                    <div class="panda-mouth">
                        <span></span>
                    </div>

                </div>

                <div class="panda-torso"></div>

                <div class="panda-arm panda-arm-left"></div>

                <div class="panda-arm panda-arm-right"></div>

                <div class="panda-leg panda-leg-left"></div>

                <div class="panda-leg panda-leg-right"></div>

            </div>

            <div class="panda-speech">
                Hah! Keep trying 😏👀
            </div>
        `;


        document.body.appendChild(
            panda
        );


        return panda;
    }


    /* =====================================================
       PANDA MESSAGE / ANIMATION
       ===================================================== */

    function showPandaMessage() {

        if (pandaShown) {
            return;
        }

        if (pandaAnimationRunning) {
            return;
        }


        pandaShown = true;

        pandaAnimationRunning = true;


        pandaElement =
            createPanda();


        /*
         * Walks in from the right.
         */

        pandaElement.classList.add(
            "panda-walking"
        );


        /*
         * Starts speaking after entering.
         */

        setTimeout(() => {

            if (!pandaElement) {
                return;
            }

            pandaElement.classList.add(
                "panda-speaking"
            );

        }, 1800);


        /*
         * Stops speaking and leaves.
         */

        setTimeout(() => {

            if (!pandaElement) {
                return;
            }

            pandaElement.classList.remove(
                "panda-speaking"
            );

            pandaElement.classList.add(
                "panda-leaving"
            );

        }, 3900);


        /*
         * Remove panda completely.
         */

        setTimeout(() => {

            if (pandaElement) {

                pandaElement.remove();

                pandaElement = null;
            }

            pandaAnimationRunning =
                false;

        }, 6100);
    }


    /* =====================================================
       DISTANCE TO ELEMENT
       ===================================================== */

    function distanceToElement(
        x,
        y,
        element
    ) {

        if (!element) {
            return Infinity;
        }


        const rect =
            element.getBoundingClientRect();


        const closestX =
            Math.max(
                rect.left,
                Math.min(
                    x,
                    rect.right
                )
            );


        const closestY =
            Math.max(
                rect.top,
                Math.min(
                    y,
                    rect.bottom
                )
            );


        const dx =
            x - closestX;

        const dy =
            y - closestY;


        return Math.sqrt(
            dx * dx +
            dy * dy
        );
    }


    /* =====================================================
       CURSOR TARGET CHECK
       ===================================================== */

    function checkCursorTargets() {

        if (
            !finalInteractionEnabled
        ) {
            return;
        }


        /*
         * Check Reject.
         */

        const rejectDistance =
            distanceToElement(
                cursorX,
                cursorY,
                rejectFlower
            );


        if (
            rejectDistance < 95
        ) {

            escapeRejectButton();
        }


        /*
         * Check Take Flower.
         */

        const takeDistance =
            distanceToElement(
                cursorX,
                cursorY,
                takeFlower
            );


        if (
            takeDistance < 65
        ) {

            takeFlower.classList.add(
                "cursor-near"
            );

        } else {

            takeFlower.classList.remove(
                "cursor-near"
            );
        }
    }


    /* =====================================================
       CURSOR DRAG
       ===================================================== */

    cursor.addEventListener(
        "pointerdown",
        event => {

            if (
                !finalInteractionEnabled
            ) {
                return;
            }


            event.preventDefault();

            draggingCursor = true;

            cursor.classList.add(
                "dragging"
            );


            cursor.setPointerCapture(
                event.pointerId
            );
        }
    );


    cursor.addEventListener(
        "pointermove",
        event => {

            if (
                !draggingCursor ||
                !finalInteractionEnabled
            ) {
                return;
            }


            event.preventDefault();


            setCursorPosition(
                event.clientX,
                event.clientY
            );


            checkCursorTargets();
        }
    );


    cursor.addEventListener(
        "pointerup",
        event => {

            if (!draggingCursor) {
                return;
            }


            draggingCursor = false;

            cursor.classList.remove(
                "dragging"
            );


            checkCursorTargets();


            const takeDistance =
                distanceToElement(
                    cursorX,
                    cursorY,
                    takeFlower
                );


            if (
                takeDistance < 70 &&
                finalInteractionEnabled
            ) {

                acceptFlower();
            }
        }
    );


    cursor.addEventListener(
        "pointercancel",
        () => {

            draggingCursor = false;

            cursor.classList.remove(
                "dragging"
            );
        }
    );


    /* =====================================================
       BLOCK DIRECT FINAL BUTTON TOUCH
       ===================================================== */

    function blockFinalButtonInput(
        event
    ) {

        if (
            finalInteractionEnabled
        ) {

            event.preventDefault();

            event.stopPropagation();
        }
    }


    if (takeFlower) {

        [
            "pointerdown",
            "pointerup",
            "click",
            "touchstart",
            "touchend"
        ].forEach(type => {

            takeFlower.addEventListener(
                type,
                blockFinalButtonInput,
                true
            );
        });
    }


    if (rejectFlower) {

        [
            "pointerdown",
            "pointerup",
            "click",
            "touchstart",
            "touchend"
        ].forEach(type => {

            rejectFlower.addEventListener(
                type,
                blockFinalButtonInput,
                true
            );
        });
    }


    /* =====================================================
       ACCEPT FLOWER
       ===================================================== */

    function acceptFlower() {

        if (
            !finalInteractionEnabled
        ) {
            return;
        }


        finalInteractionEnabled =
            false;


        /*
         * Cancel the panda countdown.
         */

        if (pandaDelayTimer) {

            clearTimeout(
                pandaDelayTimer
            );

            pandaDelayTimer = null;
        }


        if (takeFlower) {

            takeFlower.classList.remove(
                "cursor-near"
            );

            takeFlower.style.transform =
                "scale(1.06)";
        }


        if (rejectFlower) {

            rejectFlower.style.opacity =
                "0";

            rejectFlower.style.visibility =
                "hidden";

            rejectFlower.style.pointerEvents =
                "none";
        }


        if (cursorHint) {

            cursorHint.classList.remove(
                "visible"
            );

            cursorHint.setAttribute(
                "aria-hidden",
                "true"
            );
        }


        if (pandaElement) {

            pandaElement.remove();

            pandaElement = null;
        }


        pandaAnimationRunning =
            false;


        if (finalMessage) {

            finalMessage.setAttribute(
                "aria-hidden",
                "false"
            );

            finalMessage.classList.add(
                "visible"
            );
        }


        setTimeout(() => {

            hideCursor();

        }, 450);
    }


    /* =====================================================
       REJECT HOVER / FOCUS
       ===================================================== */

    if (rejectFlower) {

        rejectFlower.addEventListener(
            "mouseenter",
            () => {

                if (
                    finalInteractionEnabled
                ) {

                    escapeRejectButton();
                }
            }
        );


        rejectFlower.addEventListener(
            "focus",
            () => {

                if (
                    finalInteractionEnabled
                ) {

                    rejectFlower.blur();

                    escapeRejectButton();
                }
            }
        );
    }


    /* =====================================================
       COVER
       ===================================================== */

    if (bookCover) {

        bookCover.addEventListener(
            "click",
            event => {

                event.preventDefault();

                openBook();
            }
        );
    }


    /* =====================================================
       NEXT BUTTON
       ===================================================== */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                nextPage();
            }
        );
    }


    /* =====================================================
       PREVIOUS BUTTON
       ===================================================== */

    if (prevButton) {

        prevButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                previousPage();
            }
        );
    }


    /* =====================================================
       RETURN BUTTON
       ===================================================== */

    if (bookReturn) {

        bookReturn.addEventListener(
            "click",
            () => {

                window.location.href =
                    "index.html";
            }
        );
    }


    /* =====================================================
       INITIALIZE
       ===================================================== */

    function initialiseBook() {

        bookOpened = false;

        currentPage = 0;

        isAnimating = false;


        rejectEscapeCount = 0;

        pandaShown = false;

        pandaAnimationRunning = false;


        closeFinalSpread();

        disableFinalInteraction();


        /*
         * COVER RESET
         */

        if (bookCover) {

            bookCover.classList.remove(
                "page-turned"
            );

            bookCover.style.zIndex =
                "40";
        }


        pages.forEach(page => {

            page.classList.remove(
                "page-turned"
            );

            page.classList.remove(
                "spread-left-page"
            );

            page.classList.remove(
                "spread-right-page"
            );
        });


        if (bookHint) {

            bookHint.textContent =
                "TAP THE COVER TO OPEN";
        }


        if (finalMessage) {

            finalMessage.classList.remove(
                "visible"
            );

            finalMessage.setAttribute(
                "aria-hidden",
                "true"
            );
        }


        /*
         * Explicitly keep both flower buttons
         * hidden until Page 13 is opened.
         */

        if (takeFlower) {

            takeFlower.style.opacity =
                "0";

            takeFlower.style.visibility =
                "hidden";

            takeFlower.style.pointerEvents =
                "none";
        }


        if (rejectFlower) {

            rejectFlower.style.opacity =
                "0";

            rejectFlower.style.visibility =
                "hidden";

            rejectFlower.style.pointerEvents =
                "none";
        }


        updateCounter();

        updateControls();


        setCursorPosition(
            window.innerWidth / 2,
            window.innerHeight / 2
        );
    }


    /* =====================================================
       RESIZE
       ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                finalInteractionEnabled &&
                rejectEscapeCount > 0
            ) {

                positionRejectButton(true);
            }
        }
    );


    /* =====================================================
       START
       ===================================================== */

    initialiseBook();

});
