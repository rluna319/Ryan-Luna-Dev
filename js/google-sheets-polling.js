document.addEventListener('DOMContentLoaded', function () {
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
});
