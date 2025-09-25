document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mainHeader = document.querySelector('.main-header');
    
    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', function() {
            mobileToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close mobile menu when clicking on menu links
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    // Header scroll effect
    if (mainHeader) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = mainHeader ? mainHeader.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Banner animations
    const bannerElements = document.querySelectorAll('.content-left > *');
    const imageItems = document.querySelectorAll('.image-item');
    
    // Animate banner content on load
    if (bannerElements.length > 0) {
        bannerElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // Animate images with stagger effect
    if (imageItems.length > 0) {
        imageItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px) scale(0.8)';
            
            setTimeout(() => {
                item.style.transition = 'all 1s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, 800 + (index * 300));
        });
    }
    
    // Parallax effect for video background (optional)
    const videoBackground = document.querySelector('.video-background');
    if (videoBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            videoBackground.style.transform = `translateY(${parallax}px)`;
        });
    }
    
    // Selo boxes hover animation
    const seloBoxes = document.querySelectorAll('.selo-box');
    
    seloBoxes.forEach(box => {
        const description = box.getAttribute('data-description');
        
        // Create description overlay element
        const descriptionElement = document.createElement('div');
        descriptionElement.className = 'selo-description';
        descriptionElement.innerHTML = `<p>${description}</p>`;
        box.appendChild(descriptionElement);
        
        let hoverTimeout;
        
        // Mouse enter event
        box.addEventListener('mouseenter', function() {
            // Clear any existing timeout
            clearTimeout(hoverTimeout);
            
            // Add hover class with slight delay for smooth animation
            hoverTimeout = setTimeout(() => {
                box.classList.add('show-description');
            }, 100);
        });
        
        // Mouse leave event
        box.addEventListener('mouseleave', function() {
            // Clear timeout if mouse leaves quickly
            clearTimeout(hoverTimeout);
            
            // Remove hover class immediately
            box.classList.remove('show-description');
        });
        
        // Touch events for mobile
        box.addEventListener('touchstart', function(e) {
            // Prevent default to avoid issues on mobile
            e.preventDefault();
            
            // Toggle description on touch
            if (box.classList.contains('show-description')) {
                box.classList.remove('show-description');
            } else {
                // Remove description from other boxes first
                seloBoxes.forEach(otherBox => {
                    if (otherBox !== box) {
                        otherBox.classList.remove('show-description');
                    }
                });
                box.classList.add('show-description');
            }
        });
    });
    
    // Close description when clicking outside on mobile
    document.addEventListener('touchstart', function(e) {
        if (!e.target.closest('.selo-box')) {
            seloBoxes.forEach(box => {
                box.classList.remove('show-description');
            });
        }
    });
    
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header[data-toggle="accordion"]');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            e.preventDefault();
            
            const accordionItem = this.closest('.accordion-item');
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const accordionIcon = this.querySelector('.accordion-icon');
            
            // Check if this accordion is currently active
            const isActive = accordionContent.classList.contains('active');
            
            // Close all other accordions in the same parent
            const parentAccordion = this.closest('.selo-accordion');
            const allAccordionItems = parentAccordion.querySelectorAll('.accordion-item');
            
            allAccordionItems.forEach(item => {
                const content = item.querySelector('.accordion-content');
                const icon = item.querySelector('.accordion-icon');
                
                if (content && content.classList.contains('active')) {
                    content.classList.remove('active');
                    if (icon) icon.textContent = '+';
                }
            });
            
            // Toggle the clicked accordion if it wasn't active
            if (!isActive) {
                accordionContent.classList.add('active');
                accordionIcon.textContent = '-';
            }
        });
    });
    
});

// Add CSS to prevent body scroll when mobile menu is open
const menuStyle = document.createElement('style');
menuStyle.textContent = `
    body.menu-open {
        overflow: hidden;
    }
    
    @media (max-width: 1024px) {
        body.menu-open {
            position: fixed;
            width: 100%;
        }
    }
`;
document.head.appendChild(menuStyle);
