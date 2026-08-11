/* =========================================================
   CYBER MEMORY
   CONSTELLATION EXPERIENCE
   ========================================================= */

(() => {

    "use strict";


    /* =====================================================
       CONFIGURATION
       ===================================================== */

    const STAR_COUNT = 90;

    const STAR_MIN_SIZE = 1;

    const STAR_MAX_SIZE = 3;


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const constellation =
        document.getElementById(
            "constellation"
        );

    const starField =
        document.getElementById(
            "constellationStars"
        );

    const canvas =
        document.getElementById(
            "constellationCanvas"
        );

    const continueButton =
        document.getElementById(
            "constellationContinue"
        );


    /* =====================================================
       SAFETY CHECK
       ===================================================== */

    if (!constellation) {

        console.error(
            "[Constellation] #constellation not found."
        );

        return;

    }


    /* =====================================================
       STAR GENERATOR
       ===================================================== */

    function createStars() {

        if (!starField) {

            return;

        }


        starField.innerHTML = "";


        for (
            let i = 0;
            i < STAR_COUNT;
            i++
        ) {

            const star =
                document.createElement(
                    "span"
                );


            star.className =
                "constellation-star";


            const size =
                STAR_MIN_SIZE +
                Math.random() *
                (
                    STAR_MAX_SIZE -
                    STAR_MIN_SIZE
                );


            star.style.width =
                `${size}px`;

            star.style.height =
                `${size}px`;


            star.style.left =
                `${Math.random() * 100}%`;

            star.style.top =
                `${Math.random() * 100}%`;


            star.style.animationDelay =
                `${Math.random() * 4}s`;


            star.style.animationDuration =
                `${3 + Math.random() * 4}s`;


            starField.appendChild(
                star
            );

        }

    }


    /* =====================================================
       CONSTELLATION DRAWING
       ===================================================== */

    function drawConstellation() {

        if (!canvas) {

            return;

        }


        canvas.innerHTML = "";


        /*
         * Points form a simple heart-like
         * constellation pattern.
         */

        const points = [

            [500, 180],

            [410, 260],

            [350, 360],

            [400, 470],

            [500, 560],

            [600, 470],

            [650, 360],

            [590, 260],

            [500, 330]

        ];


        /*
         * Connections.
         */

        const connections = [

            [0, 1],
            [0, 7],

            [1, 2],
            [2, 3],
            [3, 4],

            [7, 6],
            [6, 5],
            [5, 4],

            [1, 8],
            [7, 8],

            [8, 4]

        ];


        /*
         * SVG namespace.
         */

        const SVG_NS =
            "http://www.w3.org/2000/svg";


        /*
         * Draw lines.
         */

        connections.forEach(
            ([a, b]) => {

                const line =
                    document.createElementNS(
                        SVG_NS,
                        "line"
                    );


                line.setAttribute(
                    "x1",
                    points[a][0]
                );

                line.setAttribute(
                    "y1",
                    points[a][1]
                );

                line.setAttribute(
                    "x2",
                    points[b][0]
                );

                line.setAttribute(
                    "y2",
                    points[b][1]
                );


                line.classList.add(
                    "constellation-line"
                );


                canvas.appendChild(
                    line
                );

            }
        );


        /*
         * Draw nodes.
         */

        points.forEach(
            ([x, y]) => {

                const circle =
                    document.createElementNS(
                        SVG_NS,
                        "circle"
                    );


                circle.setAttribute(
                    "cx",
                    x
                );

                circle.setAttribute(
                    "cy",
                    y
                );

                circle.setAttribute(
                    "r",
                    "5"
                );


                circle.classList.add(
                    "constellation-node"
                );


                canvas.appendChild(
                    circle
                );

            }
        );

    }


    /* =====================================================
       ACTIVATE EXPERIENCE
       ===================================================== */

    function activate() {

        constellation.classList.add(
            "is-active"
        );

    }


    /* =====================================================
       PUZZLE NAVIGATION
       ===================================================== */

    function openPuzzle() {

        if (
            !continueButton ||
            continueButton.classList.contains(
                "is-clicked"
            )
        ) {

            return;

        }


        continueButton.classList.add(
            "is-clicked"
        );


        /*
         * Start page outro.
         */

        document.body.classList.add(
            "page-exiting"
        );


        /*
         * Navigate after animation.
         */

        window.setTimeout(
            () => {

                window.location.href =
                    "puzzle.html";

            },
            700
        );

    }


    /* =====================================================
       CONTINUE BUTTON
       ===================================================== */

    if (continueButton) {

        continueButton.addEventListener(
            "click",
            openPuzzle
        );

    }


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    createStars();

    drawConstellation();


    /*
     * Expose a small API so intro.js can
     * optionally trigger activation.
     */

    window.constellationExperience = {

        start: activate

    };


})();
