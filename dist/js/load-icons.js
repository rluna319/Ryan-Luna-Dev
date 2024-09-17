document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM Content Loaded - Running load-icons.js");

    const icons = [
        { id: 'python-icon', path: '../assets/icons/python-icon.svg' }
    ];

    icons.forEach(icon => {
        const element = document.getElementById(icon.id);
        if (element) {
            console.log(`Fetching icon: ${icon.path}`);
            fetch(icon.path)
                .then(response => response.text())
                .then(data => {
                    console.log(`Icon loaded: ${icon.id}`);
                    element.innerHTML = data;
                })
                .catch(error => console.error('Error loading SVG:', error));
        }
    });
});
