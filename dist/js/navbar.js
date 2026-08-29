//
// JS for the navbar
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink, { passive: true });

    // Lightweight scrollspy (Bootstrap 5.2's IntersectionObserver scrollspy
    // gets stuck on tall sections): highlight the nav link of the last
    // section whose top has passed 35% of the viewport.
    const navLinks = Array.from(document.querySelectorAll('#mainNav .nav-link[href^="#"]'));
    const spySections = navLinks
        .map(function (link) { return document.querySelector(link.getAttribute('href')); })
        .filter(Boolean);

    function updateScrollSpy() {
        const pos = window.scrollY + window.innerHeight * 0.35;
        let current = null;
        spySections.forEach(function (section) {
            if (section.offsetTop <= pos) {
                current = '#' + section.id;
            }
        });
        navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === current);
        });
    }
    document.addEventListener('scroll', updateScrollSpy, { passive: true });
    updateScrollSpy();

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
