/* =========================================================
   CYBER MEMORY
   INTRO EXPERIENCE
   ========================================================= */

(() => {

    "use strict";


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const beginButton =
        document.getElementById(
            "beginExperience"
        );

    const intro =
        document.getElementById(
            "intro"
        );

    const constellation =
        document.getElementById(
            "constellation"
        );


    /* =====================================================
       SAFETY CHECK
       ===================================================== */

    if (!beginButton) {

        console.error(
            "[Intro] #beginExperience was not found."
        );

        return;

    }


    if (!intro) {

        console.error(
            "[Intro] #intro was not found."
        );

        return;

    }


    if (!constellation) {

        console.error(
            "[Intro] #constellation was not found."
        );

        return;

    }


    /* =====================================================
       BEGIN EXPERIENCE
       ===================================================== */

    beginButton.addEventListener(
        "click",
        () => {

            /*
             * Prevent multiple clicks.
             */

            if (
                beginButton.classList.contains(
                    "is-clicked"
                )
            ) {

                return;

            }


            beginButton.classList.add(
                "is-clicked"
            );


            /*
             * Start intro outro animation.
             */

            intro.classList.add(
                "is-exiting"
            );


            /*
             * Activate constellation.
             */

            constellation.classList.add(
                "is-active"
            );


            /*
             * Wait for intro transition
             * before removing it visually.
             */

            window.setTimeout(
                () => {

                    intro.style.display =
                        "none";

                },
                900
            );

        }
    );


})();
