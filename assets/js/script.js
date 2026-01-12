// ============================
// TEMSAN AIR ENGINEERING
// Optimized JavaScript
// ============================

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============================
    // Performance: Throttled Scroll Handler
    // ============================
    let ticking = false;
    let lastScrollY = 0;

    function onScroll() {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }

    function updateOnScroll() {
        const scrollY = lastScrollY;

        // Header scroll effect
        handleHeaderScroll(scrollY);

        // Back to top button
        toggleBackToTop(scrollY);

        ticking = false;
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // ============================
    // Header Scroll Effect
    // ============================
    const header = document.querySelector('.header-area');

    function handleHeaderScroll(scrollY) {
        if (!header) return;
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Run on load
    handleHeaderScroll(window.scrollY);

    // ============================
    // Mobile Menu
    // ============================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileCloseBtn = document.getElementById('mobileCloseBtn');
    const navbarCollapse = document.getElementById('mainNav');
    const mobileOverlay = document.getElementById('mobileOverlay');

    function openMobileMenu() {
        if (!navbarCollapse) return;
        navbarCollapse.classList.add('show');
        if (mobileOverlay) mobileOverlay.classList.add('active');
        if (mobileMenuToggle) mobileMenuToggle.classList.add('active');
        if (mobileCloseBtn) mobileCloseBtn.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        if (!navbarCollapse) return;
        navbarCollapse.classList.remove('show');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
        if (mobileCloseBtn) mobileCloseBtn.classList.remove('show');
        document.body.style.overflow = '';
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', closeMobileMenu);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }

    // ============================
    // Mobile Mega Menu Toggle
    // ============================
    const megaDropdowns = document.querySelectorAll('.mega-dropdown');

    megaDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        if (!link) return;

        link.addEventListener('click', function(e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                dropdown.classList.toggle('active');

                megaDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
    });

    // ============================
    // Desktop Mega Menu Click Toggle
    // ============================
    megaDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        if (!link) return;

        link.addEventListener('click', function(e) {
            if (window.innerWidth >= 992) {
                e.preventDefault();
                e.stopPropagation();

                const isActive = dropdown.classList.contains('active');
                megaDropdowns.forEach(d => d.classList.remove('active'));

                if (!isActive) {
                    dropdown.classList.add('active');
                }
            }
        });
    });

    // Close mega menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth >= 992) {
            const isClickInsideMega = e.target.closest('.mega-dropdown');
            if (!isClickInsideMega) {
                megaDropdowns.forEach(d => d.classList.remove('active'));
            }
        }
    });

    // ============================
    // Regular Dropdown Click Toggle
    // ============================
    const dropdowns = document.querySelectorAll('.nav-item.dropdown:not(.mega-dropdown)');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (toggle && menu) {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth >= 992) {
                    e.preventDefault();
                    e.stopPropagation();

                    const isOpen = menu.classList.contains('show');
                    document.querySelectorAll('.nav-item.dropdown .dropdown-menu').forEach(m => m.classList.remove('show'));

                    if (!isOpen) {
                        menu.classList.add('show');
                    }
                }
            });
        }
    });

    document.addEventListener('click', function(e) {
        if (window.innerWidth >= 992) {
            const isClickInsideDropdown = e.target.closest('.nav-item.dropdown');
            if (!isClickInsideDropdown) {
                document.querySelectorAll('.nav-item.dropdown .dropdown-menu').forEach(m => m.classList.remove('show'));
            }
        }
    });

    // ============================
    // Search Overlay
    // ============================
    const searchToggle = document.getElementById('searchToggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.querySelector('.search-input');

    function openSearch() {
        if (!searchOverlay) return;
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            if (searchInput) searchInput.focus();
        }, 400);
    }

    function closeSearch() {
        if (!searchOverlay) return;
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (searchToggle) {
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            openSearch();
        });
    }

    if (searchClose) {
        searchClose.addEventListener('click', closeSearch);
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSearch();
            closeMobileMenu();
        }
    });

    if (searchOverlay) {
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                closeSearch();
            }
        });
    }

    // ============================
    // Back to Top Button
    // ============================
    const backToTopBtn = document.getElementById('backToTop');

    function toggleBackToTop(scrollY) {
        if (!backToTopBtn) return;
        if (scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================
    // Smooth Scroll for Anchor Links
    // ============================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        closeMobileMenu();
                    }
                }
            }
        });
    });

    // ============================
    // Scroll-Triggered Animations with Animate.css
    // ============================
    const scrollAnimateElements = document.querySelectorAll('.scroll-animate');

    if (scrollAnimateElements.length > 0 && 'IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.dataset.animation || 'fadeInUp';
                    const delay = element.dataset.delay || 0;

                    setTimeout(() => {
                        element.classList.add('animate__animated', `animate__${animation}`);
                        element.style.opacity = '1';
                        element.style.visibility = 'visible';
                    }, parseInt(delay));

                    animationObserver.unobserve(element);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        });

        scrollAnimateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.visibility = 'hidden';
            animationObserver.observe(element);
        });
    }

    // ============================
    // Counter Animation for Stats
    // ============================
    const statsSection = document.querySelector('.stats-section');
    let statsAnimated = false;

    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(stat => {
            const text = stat.textContent;
            const target = parseInt(text.replace(/[^0-9]/g, ''));
            const suffix = text.includes('+') ? '+' : '';

            if (isNaN(target)) return;

            let current = 0;
            const duration = 1500;
            const steps = 30;
            const increment = target / steps;
            const stepTime = duration / steps;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }
            }, stepTime);
        });
    }

    if (statsSection && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsSection);
    }

    // Close mobile menu on nav link click
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle):not(.search-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                closeMobileMenu();
            }
        });
    });

    // ============================
    // Page Load Complete
    // ============================
    document.body.classList.add('loaded');
});

// ============================
// Owl Carousel - Products
// ============================
$(document).ready(function() {
    if ($('.products-carousel').length) {
        $('.products-carousel').owlCarousel({
            items: 1,
            loop: true,
            margin: 0,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
            smartSpeed: 600,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            lazyLoad: true
        });
    }

    // ============================
    // Owl Carousel - Industries
    // ============================
    if ($('.industries-carousel').length) {
        $('.industries-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>'],
            dots: true,
            autoplay: true,
            autoplayTimeout: 3500,
            autoplayHoverPause: true,
            smartSpeed: 500,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        });
    }

    // ============================
    // Owl Carousel - Industries Portfolio (7 items)
    // ============================
    if ($('.industries-carousel-portfolio').length) {
        $('.industries-carousel-portfolio').owlCarousel({
            loop: true,
            margin: 6,
            nav: false,
            navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>'],
            dots: true,
            autoplay: true,
            autoplayTimeout: 3500,
            autoplayHoverPause: true,
            smartSpeed: 500,
            responsive: {
                0: {
                    items: 2
                },
                576: {
                    items: 3
                },
                768: {
                    items: 4
                },
                992: {
                    items: 5
                },
                1200: {
                    items: 6
                },
                1400: {
                    items: 6
                }
            }
        });
    }
});
