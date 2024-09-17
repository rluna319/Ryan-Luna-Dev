// JavaScript to handle form validation for radio button and changing the subject field based on the recruiter selection
document.addEventListener('DOMContentLoaded', function() {
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
