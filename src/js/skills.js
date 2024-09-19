//
// JS for the skills section
//

addEventListener('DOMContentLoaded', function () {
    // Force scroll position on Page Load (fix: for Safari and webkit broswers)
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer){
        skillsContainer.scrollLeft = 0;     // reset to 0
    } else {
        console.log('Skills container not found');
    }

    // Force scroll position on Page Resize (fix: for Safari and webkit broswers)
    window.addEventListener('resize', function () {
        const skillsContainer = document.querySelector('.skills-container');
        if (skillsContainer) {
            skillsContainer.scrollLeft = 0; // Ensure scroll is reset after resizing
        }
    });
});