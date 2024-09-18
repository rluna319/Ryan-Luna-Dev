// On window resized/rotate

window.addEventListener('resize', function () {
    const skillsContainer = document.querySelector('.skills-container');
    if (skillsContainer) {
        skillsContainer.scrollLeft = 0; // Ensure scroll is reset after resizing
    }
});
