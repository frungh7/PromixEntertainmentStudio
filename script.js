/* =====================================================
   PROMIX ENTERTAINMENT STUDIO
   MAIN JAVASCRIPT
   FORMSPREE + ZOHO CRM READY
===================================================== */


/* =====================================================
   CONFIGURATION
===================================================== */

const PROMIX_CONFIG = {

    /*
     * =================================================
     * FORMSPREE
     * =================================================
     *
     * Get this URL from your Formspree dashboard.
     *
     * Example:
     * https://formspree.io/f/xxxxxxxx
     *
     */

    FORMSPREE_ENABLED: true,

    FORMSPREE_ENDPOINT:
        
	"https://formspree.io/f/xyezqoen",

    /*
     * =================================================
     * ZOHO CRM
     * =================================================
     *
     * Set this to true AFTER you create your Zoho
     * Webform/API connection.
     *
     */

    ZOHO_ENABLED: false,

    /*
     * If using a Zoho Webform, place the Zoho
     * Webform URL here.
     *
     * Example:
     *
     * https://crm.zoho.com/crm/WebFormServeServlet?...
     *
     */

    ZOHO_WEBFORM_URL:
        "",


    /*
     * =================================================
     * GENERAL SETTINGS
     * =================================================
     */

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
   BOOKING / LEAD FORM
===================================================== */

const bookingForm =
    document.getElementById("bookingForm");

const formMessage =
    document.getElementById("formMessage");


if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        async function(event) {

            /*
             * Stop the browser from navigating away.
             */

            event.preventDefault();


            /*
             * Make sure a Formspree endpoint exists.
             */

            if (
                PROMIX_CONFIG.FORMSPREE_ENABLED &&
                (
                    !PROMIX_CONFIG.FORMSPREE_ENDPOINT ||
                    PROMIX_CONFIG.FORMSPREE_ENDPOINT.includes(
                        "YOUR_FORMSPREE_ID"
                    )
                )
            ) {

                if (formMessage) {

                    formMessage.textContent =
                        "Form is not configured yet. Please add your Formspree endpoint.";

                }

                console.error(
                    "Formspree endpoint has not been configured."
                );

                return;

            }


            /*
             * Show processing message.
             */

            if (formMessage) {

                formMessage.textContent =
                    "Sending your request...";

            }


            /*
             * Collect form data.
             */

            const formData =
                new FormData(bookingForm);


            /*
             * Add lead source.
             */

            formData.append(
                "lead_source",
                PROMIX_CONFIG.LEAD_SOURCE
            );


            /*
             * Add current website URL.
             */

            formData.append(
                "website_url",
                window.location.href
            );


            /* =================================================
               SEND TO FORMSPREE
            ================================================= */

            try {

                if (PROMIX_CONFIG.FORMSPREE_ENABLED) {

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


                    /*
                     * Check Formspree response.
                     */

                    if (!response.ok) {

                        throw new Error(
                            `Formspree error: ${response.status}`
                        );

                    }

                }


                /* =================================================
                   ZOHO CRM
                ================================================= */

                /*
                 * Zoho is optional.
                 *
                 * It will only run when:
                 *
                 * ZOHO_ENABLED = true
                 *
                 * AND
                 *
                 * a Zoho Webform URL exists.
                 */

                if (
                    PROMIX_CONFIG.ZOHO_ENABLED &&
                    PROMIX_CONFIG.ZOHO_WEBFORM_URL
                ) {

                    try {

                        await fetch(
                            PROMIX_CONFIG.ZOHO_WEBFORM_URL,
                            {
                                method: "POST",

                                body: formData,

                                mode: "no-cors"
                            }
                        );

                    }

                    catch (zohoError) {

                        /*
                         * Do not prevent the Formspree
                         * submission from succeeding
                         * if Zoho has a problem.
                         */

                        console.error(
                            "Zoho submission error:",
                            zohoError
                        );

                    }

                }


                /* =================================================
                   SUCCESS
                ================================================= */

                if (formMessage) {

                    formMessage.textContent =
                        "Thank you! Your request has been received. We will contact you shortly.";

                }


                /*
                 * Clear the form after successful
                 * Formspree submission.
                 */

                bookingForm.reset();


            }

            catch (error) {

                console.error(
                    "Form submission error:",
                    error
                );


                /* =================================================
                   ERROR MESSAGE
                ================================================= */

                if (formMessage) {

                    formMessage.textContent =
                        "Sorry, there was a problem sending your request. Please try again or contact us directly.";

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

