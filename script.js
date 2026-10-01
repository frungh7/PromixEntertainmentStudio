/* =====================================================
   PROMIX ENTERTAINMENT STUDIO
   MAIN JAVASCRIPT
===================================================== */
/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener(
        "click",
        () => {

            mainNav.classList.toggle("active");

        }
    );

    mainNav.querySelectorAll("a").forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    mainNav.classList.remove("active");

                }
            );

        }
    );

}
/* =====================================================
   BOOKING FORM
===================================================== */

const bookingForm =
    document.getElementById("bookingForm");

const formMessage =
    document.getElementById("formMessage");

if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            /*
             * This is currently a front-end demo.
             *
             * Connect this form to:
             *
             * Formspree
             * Netlify Forms
             * Your CRM
             * Your own backend
             *
             * before using it for real leads.
             */

            formMessage.textContent =
                "Thank you! Your request has been received.";

            bookingForm.reset();

        }
    );

}

/* =====================================================
   CURRENT YEAR
===================================================== */
const year =
    new Date().getFullYear();


const footerYear =
    document.querySelector(".footer-bottom");

if (footerYear) {

    footerYear.innerHTML =
        `© ${year} Promix Entertainment Studio. All Rights Reserved.`;
}
