/*!
* Ryan Luna | Developer Hub v1.0.2 (https://rluna319.github.io/Ryan-Luna-Dev/)
* Based on Start Bootstrap 
* Copyright 2013-2024 Ryan Luna
* Licensed under MIT (see LICENSE file in the project root for more information)
*/
//
// JS for the contact form section
//

document.addEventListener('DOMContentLoaded', function () {

    //------------ Google Sheets Polling ------------
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTAoWD4MxwJpGLW1qkcVzlSUsbc2e9OBYgAZyLp3_bufADpx8_ePyVed49XnAQdXwSB6Jj8Rz3OHY4M/pub?output=csv';
    // Function to fetch the CSV data and check the submission count
    function checkSubmissionCount() {
        fetch(csvUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                // Parse the CSV data
                const rows = data.split('\n').map(row => row.split(','));
                console.log('CSV data:', rows);

                // Example: Assume submission count is in the second column (B) of the first row
                const submissionCountString = rows[1];
                const submissionCount = parseInt(submissionCountString, 10);
                // console.log('Submission count:', submissionCount);

                // Trigger an alert or other actions when the submission count reaches or exceeds 45
                if (submissionCount >= 45) {
                    alert('Hello! My Contact form submission limit has been reached!\nPlease reach out via social media such as linkedin. Link is in the footer.\nThank you!');
                    // Perform actions like redirecting to another form or hiding the current form
                }
            })
            .catch(error => {
                console.error('Error fetching CSV data:', error);
            });
    }
    // Check the submission count immediately when the page loads
    checkSubmissionCount();
    // Set an interval to check the submission count every 30 seconds (30000 milliseconds)
    setInterval(checkSubmissionCount, 30000);  // Adjust interval as needed (in milliseconds)


    //------------ Show/Hide Company Field ------------
    const recruiterYes = document.getElementById('recruiter-yes');
    const recruiterNo = document.getElementById('recruiter-no');
    const companyField = document.getElementById('companyField');
    const companyInput = document.getElementById('company');

    if (recruiterYes && recruiterNo && companyField && companyInput) {
        recruiterYes.addEventListener('change', function() {
            if (recruiterYes.checked) {
                companyField.classList.add('show');
                companyField.setAttribute('aria-hidden', 'false');
                companyInput.removeAttribute('disabled');
            }
        });

        recruiterNo.addEventListener('change', function() {
            if (recruiterNo.checked) {
                companyField.classList.remove('show');
                companyField.setAttribute('aria-hidden', 'true');
                companyInput.setAttribute('disabled', 'disabled');
            }
        });
    }

    //------------ Form Validation ------------
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function(event) {
        const recruiterYes = document.getElementById('recruiter-yes');
        const recruiterNo = document.getElementById('recruiter-no');
        const subjectField = document.getElementById('subject');

        // Function to update the subject field based on recruiter selection
        function updateSubject() {
            if (recruiterYes.checked) {
                subjectField.value = '[Formspree] Recruiter Form Submission';
            } else {
                subjectField.value = '[Formspree] Non-Recruiter Form Submission';
            }
        }

        // Add event listeners to the radio buttons to trigger the subject update
        recruiterYes.addEventListener('change', updateSubject);
        recruiterNo.addEventListener('change', updateSubject);

        // Initialize subject on page load based on default selection
        updateSubject();
        
        // Check if either recruiter option is selected
        if (!recruiterYes.checked && !recruiterNo.checked) {
            recruiterYes.setCustomValidity("Please select an option.");
        } else {
            recruiterYes.setCustomValidity(""); // Clear any existing validation error
        }

        // Let the form submit if valid
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');
        }
    });
});
