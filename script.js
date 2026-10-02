```javascript
/* =====================================================
   PROMIX ENTERTAINMENT STUDIO
   MAIN JAVASCRIPT
   FORMSPREE FORM SUBMISSION
===================================================== */


/* =====================================================
   CONFIGURATION
===================================================== */

const PROMIX_CONFIG = {

    FORMSPREE_ENABLED: true,

    /*
     * REPLACE THIS WITH YOUR REAL FORMSPREE ENDPOINT
     *
     * Example:
     * https://formspree.io/f/abcd1234
     */

    FORMSPREE_ENDPOINT:
        /*"https://formspree.io/f/YOUR_FORMSPREE_ID",*/
		"https://formspree.io/f/xyezqoen",

    LEAD_SOURCE:
        "Promix Entertainment Studio Website"

};


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
        async function(event) {

            event.preventDefault();


            /* =================================================
               PREVENT DOUBLE SUBMISSION
            ================================================= */

            if (
                bookingForm.dataset.submitting === "true"
            ) {

                return;

            }


            bookingForm.dataset.submitting =
                "true";


            /* =================================================
               SUBMIT BUTTON
            ================================================= */

            const submitButton =
                bookingForm.querySelector(
                    'button[type="submit"]'
                );


            const originalButtonText =
                submitButton
                    ? submitButton.textContent
                    : "";


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    "Sending...";

            }


            /* =================================================
               CHECK FORMSPREE CONFIGURATION
            ================================================= */

            if (
                !PROMIX_CONFIG.FORMSPREE_ENDPOINT ||
                PROMIX_CONFIG.FORMSPREE_ENDPOINT.includes(
                    "YOUR_FORMSPREE_ID"
                )
            ) {

                console.error(
                    "ERROR: Formspree endpoint has not been configured."
                );


                if (formMessage) {

                    formMessage.textContent =
                        "Formspree is not configured yet.";

                }


                resetFormState();

                return;

            }


            /* =================================================
               SHOW SENDING MESSAGE
            ================================================= */

            if (formMessage) {

                formMessage.textContent =
                    "Sending your request...";

            }


            /* =================================================
               CREATE FORM DATA
            ================================================= */

            const formData =
                new FormData(bookingForm);


            /* =================================================
               ADD LEAD SOURCE
            ================================================= */

            formData.append(
                "lead_source",
                PROMIX_CONFIG.LEAD_SOURCE
            );


            /* =================================================
               ADD WEBSITE URL
            ================================================= */

            formData.append(
                "website_url",
                window.location.href
            );


            /* =================================================
               SEND TO FORMSPREE
            ================================================= */

            try {

                console.log(
                    "Submitting form to:",
                    PROMIX_CONFIG.FORMSPREE_ENDPOINT
                );


                const response =
                    await fetch(
                        PROMIX_CONFIG.FORMSPREE_ENDPOINT,
                        {
                            method: "POST",

                            body: formData,

                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                console.log(
                    "Formspree response status:",
                    response.status
                );


                /* =================================================
                   SUCCESS
                ================================================= */

                if (response.ok) {

                    const result =
                        await response.json().catch(
                            () => null
                        );


                    console.log(
                        "Formspree submission successful:",
                        result
                    );


                    if (formMessage) {

                        formMessage.textContent =
                            "Thank you! Your request has been received. We will contact you shortly.";

                    }


                    bookingForm.reset();


                    /*
                     * Leave the form available
                     * for another visitor submission.
                     */

                    resetFormState();

                    return;

                }


                /* =================================================
                   FORMSPREE ERROR
                ================================================= */

                let errorText =
                    `Formspree returned HTTP ${response.status}`;


                try {

                    const errorData =
                        await response.json();


                    console.error(
                        "Formspree error response:",
                        errorData
                    );


                    if (
                        errorData &&
                        errorData.errors
                    ) {

                        errorText =
                            errorData.errors
                                .map(
                                    error =>
                                        error.message
                                )
                                .join(", ");

                    }

                }

                catch (jsonError) {

                    console.error(
                        "Could not read Formspree error response.",
                        jsonError
                    );

                }


                throw new Error(
                    errorText
                );

            }


            catch (error) {

                console.error(
                    "FORM SUBMISSION FAILED:",
                    error
                );


                if (formMessage) {

                    formMessage.textContent =
                        "There was a problem submitting your request. Please try again.";

                }


                resetFormState();

            }


            /* =================================================
               RESET FORM STATE
            ================================================= */

            function resetFormState() {

                bookingForm.dataset.submitting =
                    "false";


                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        originalButtonText;

                }

            }

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
```
