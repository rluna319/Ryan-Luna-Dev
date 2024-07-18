/*!
* Start Bootstrap - Ryan Luna | Developer Hub v1.0.0 (https://my-portfolio.com)
* Copyright 2013-2024 Ryan Luna
* Licensed under MIT (https://github.com/StartBootstrap/my-portfolio/blob/master/LICENSE)
*/
//
// Scripts
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
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

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

    // Show/hide company field based on recruiter selection
    const recruiterYes = document.getElementById('recruiter-yes');
    const recruiterNo = document.getElementById('recruiter-no');
    const companyField = document.getElementById('companyField');

    if (recruiterYes && recruiterNo && companyField) {
        recruiterYes.addEventListener('change', function() {
            if (recruiterYes.checked) {
                companyField.classList.add('show');
            }
        });

        recruiterNo.addEventListener('change', function() {
            if (recruiterNo.checked) {
                companyField.classList.remove('show');
            }
        });
    }

});
