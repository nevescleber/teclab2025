document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileClose = document.querySelector('.mobile-close');
    const mainHeader = document.querySelector('.main-header');
    
    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', function() {
            mobileToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close mobile menu with close button
        if (mobileClose) {
            mobileClose.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        }
        
        // Close mobile menu when clicking on menu links
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close mobile menu when clicking outside (but not on logo)
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

    // Swiper functionality for testes slider
    const testesSwiper = document.querySelector('.testes-swiper');
    if (testesSwiper) {
        // Função para verificar se está em mobile
        function isMobile() {
            return window.innerWidth <= 767;
        }
        
        // Se estiver em mobile, não inicializar o swiper
        if (isMobile()) {
            // Aplicar estilos estáticos para mobile
            const wrapper = testesSwiper.querySelector('.swiper-wrapper');
            if (wrapper) {
                wrapper.style.transform = 'none';
                wrapper.style.transition = 'none';
            }
            return; // Sair da função sem inicializar o swiper
        }
        
        const wrapper = testesSwiper.querySelector('.swiper-wrapper');
        const slides = testesSwiper.querySelectorAll('.swiper-slide');
        const scrollbar = testesSwiper.querySelector('.swiper-scrollbar');
        const scrollbarDrag = testesSwiper.querySelector('.swiper-scrollbar-drag');
        
        
        if (slides.length > 0 && wrapper && scrollbar && scrollbarDrag) {
            let currentTranslate = 0;
            let maxTranslate = 0;
            let isDragging = false;
            let startX = 0;
            let currentX = 0;
            let animationId = 0;
            let isScrollbarDragging = false;
            
            // Calculate container and content widths
            function calculateDimensions() {
                const containerWidth = testesSwiper.offsetWidth;
                const slideWidth = slides[0].offsetWidth + 24; // 24px = 1.5rem margin
                const totalWidth = slideWidth * slides.length;
                maxTranslate = Math.max(0, totalWidth - containerWidth);
                
                // Show partial slide when there are more than 3 slides
                if (slides.length > 3) {
                    maxTranslate += slideWidth * 0.5; // Show half of the next slide
                }
                
                updateScrollbar();
            }
            
            // Update scrollbar position and size
            function updateScrollbar() {
                if (maxTranslate === 0) {
                    scrollbarDrag.style.width = '100%';
                    scrollbarDrag.style.left = '0%';
                    return;
                }
                
                const progress = Math.abs(currentTranslate) / maxTranslate;
                const dragWidth = Math.max(10, (1 - maxTranslate / (testesSwiper.offsetWidth * 2)) * 100);
                const dragPosition = progress * (100 - dragWidth);
                
                scrollbarDrag.style.width = `${dragWidth}%`;
                scrollbarDrag.style.left = `${dragPosition}%`;
            }
            
            // Set transform
            function setSliderPosition() {
                wrapper.style.transform = `translateX(${-currentTranslate}px)`;
                updateScrollbar();
            }
            
            // Animation function
            function animation() {
                setSliderPosition();
                if (isDragging) requestAnimationFrame(animation);
            }
            
            // Touch/Mouse start
            function dragStart(e) {
                if (isScrollbarDragging) return;
                
                isDragging = true;
                startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
                currentX = startX;
                
                wrapper.style.transition = 'none';
                testesSwiper.style.cursor = 'grabbing';
                
                if (e.type.includes('mouse')) {
                    document.addEventListener('mousemove', dragMove);
                    document.addEventListener('mouseup', dragEnd);
                }
                
                requestAnimationFrame(animation);
            }
            
            // Touch/Mouse move
            function dragMove(e) {
                if (!isDragging || isScrollbarDragging) return;
                
                e.preventDefault();
                currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
                const deltaX = currentX - startX;
                const newTranslate = currentTranslate - deltaX;
                
                // Add resistance at boundaries
                if (newTranslate < 0) {
                    currentTranslate = newTranslate * 0.5;
                } else if (newTranslate > maxTranslate) {
                    currentTranslate = maxTranslate + (newTranslate - maxTranslate) * 0.5;
                } else {
                    currentTranslate = newTranslate;
                }
                
                startX = currentX;
            }
            
            // Touch/Mouse end
            function dragEnd() {
                isDragging = false;
                testesSwiper.style.cursor = 'grab';
                
                // Snap back to boundaries
                if (currentTranslate < 0) {
                    currentTranslate = 0;
                } else if (currentTranslate > maxTranslate) {
                    currentTranslate = maxTranslate;
                }
                
                wrapper.style.transition = 'transform 0.3s ease-out';
                setSliderPosition();
                
                document.removeEventListener('mousemove', dragMove);
                document.removeEventListener('mouseup', dragEnd);
            }
            
            // Scrollbar drag functionality
            function scrollbarDragStart(e) {
                e.preventDefault();
                isScrollbarDragging = true;
                const rect = scrollbar.getBoundingClientRect();
                const clickX = (e.type.includes('mouse') ? e.clientX : e.touches[0].clientX) - rect.left;
                const percentage = clickX / rect.width;
                
                currentTranslate = percentage * maxTranslate;
                if (currentTranslate < 0) currentTranslate = 0;
                if (currentTranslate > maxTranslate) currentTranslate = maxTranslate;
                
                wrapper.style.transition = 'transform 0.3s ease-out';
                setSliderPosition();
                
                if (e.type.includes('mouse')) {
                    document.addEventListener('mousemove', scrollbarDragMove);
                    document.addEventListener('mouseup', scrollbarDragEnd);
                }
            }
            
            function scrollbarDragMove(e) {
                if (!isScrollbarDragging) return;
                
                e.preventDefault();
                const rect = scrollbar.getBoundingClientRect();
                const clickX = (e.type.includes('mouse') ? e.clientX : e.touches[0].clientX) - rect.left;
                const percentage = Math.max(0, Math.min(1, clickX / rect.width));
                
                currentTranslate = percentage * maxTranslate;
                wrapper.style.transition = 'none';
                setSliderPosition();
            }
            
            function scrollbarDragEnd() {
                isScrollbarDragging = false;
                document.removeEventListener('mousemove', scrollbarDragMove);
                document.removeEventListener('mouseup', scrollbarDragEnd);
            }
            
            // Event listeners
            wrapper.addEventListener('mousedown', dragStart);
            wrapper.addEventListener('touchstart', dragStart, { passive: false });
            wrapper.addEventListener('touchmove', dragMove, { passive: false });
            wrapper.addEventListener('touchend', dragEnd);
            
            scrollbar.addEventListener('mousedown', scrollbarDragStart);
            scrollbar.addEventListener('touchstart', scrollbarDragStart, { passive: false });
            scrollbar.addEventListener('touchmove', scrollbarDragMove, { passive: false });
            scrollbar.addEventListener('touchend', scrollbarDragEnd);
            
            // Prevent default drag behavior
            wrapper.addEventListener('dragstart', e => e.preventDefault());
            
            // Wheel support
            testesSwiper.addEventListener('wheel', (e) => {
                if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                    e.preventDefault();
                    currentTranslate += e.deltaX;
                    
                    if (currentTranslate < 0) currentTranslate = 0;
                    if (currentTranslate > maxTranslate) currentTranslate = maxTranslate;
                    
                    wrapper.style.transition = 'transform 0.3s ease-out';
                    setSliderPosition();
                }
            }, { passive: false });
            
            // Initialize and handle resize
            calculateDimensions();
            window.addEventListener('resize', () => {
                // Se mudou para mobile, desabilitar swiper
                if (isMobile()) {
                    wrapper.style.transform = 'none';
                    wrapper.style.transition = 'none';
                    testesSwiper.style.cursor = 'default';
                    return;
                }
                // Se voltou para desktop, reabilitar
                testesSwiper.style.cursor = 'grab';
                wrapper.style.transition = 'transform 0.3s ease-out';
                calculateDimensions();
            });
            
            // Initial setup
            testesSwiper.style.cursor = 'grab';
            wrapper.style.transition = 'transform 0.3s ease-out';
        }
    }
    
    // Selos Mobile Swiper - Função simplificada
    let swiperInstance = null;
    
    function initSelosSwiper() {
        const swiper = document.querySelector('.selos-mobile-swiper');
        if (!swiper) return;
        
        const wrapper = swiper.querySelector('.swiper-wrapper');
        const pagination = swiper.querySelector('.teclab-pagination-bullets.selos-mobile-pagination');
        
        if (!wrapper || !pagination) return;
        
        // Limpar instância anterior
        if (swiperInstance && swiperInstance.wrapper) {
            swiperInstance.wrapper.removeEventListener('touchstart', swiperInstance.handleTouchStart);
            swiperInstance.wrapper.removeEventListener('touchend', swiperInstance.handleTouchEnd);
        }
        
        // Reset wrapper position
        wrapper.style.transform = 'translateX(0%)';
        
        // Verificar se é mobile
        if (window.innerWidth <= 992) {
            let currentSlide = 0;
            
            // Forçar estilos da paginação
            pagination.style.display = 'flex';
            pagination.style.justifyContent = 'center';
            pagination.style.marginTop = '2rem';
            pagination.style.gap = '8px';
            pagination.style.position = 'relative';
            pagination.style.zIndex = '10';
            pagination.style.opacity = '1';
            
            // SEMPRE criar bullets
            pagination.innerHTML = `
                <div class="teclab-bullet teclab-bullet-active" data-index="0"></div>
                <div class="teclab-bullet" data-index="1"></div>
                <div class="teclab-bullet" data-index="2"></div>
            `;
            
            // Função para ir para slide
            function goToSlide(index) {
                currentSlide = index;
                wrapper.style.transform = `translateX(-${index * 33.333}%)`;
                
                // Atualizar bullets
                const bullets = pagination.querySelectorAll('.teclab-bullet');
                bullets.forEach((bullet, i) => {
                    bullet.classList.toggle('teclab-bullet-active', i === index);
                });
            }
            
            // Click nos bullets
            const bullets = pagination.querySelectorAll('.teclab-bullet');
            bullets.forEach((bullet, index) => {
                bullet.addEventListener('click', () => {
                    goToSlide(index);
                });
            });
            
            // Touch handlers
            let startX = 0;
            
            function handleTouchStart(e) {
                startX = e.touches[0].clientX;
            }
            
            function handleTouchEnd(e) {
                const endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                
                if (Math.abs(diff) > 50) {
                    if (diff > 0 && currentSlide < 2) {
                        goToSlide(currentSlide + 1);
                    } else if (diff < 0 && currentSlide > 0) {
                        goToSlide(currentSlide - 1);
                    }
                }
            }
            
            // Adicionar event listeners
            wrapper.addEventListener('touchstart', handleTouchStart);
            wrapper.addEventListener('touchend', handleTouchEnd);
            
            // Salvar instância
            swiperInstance = {
                wrapper: wrapper,
                pagination: pagination,
                handleTouchStart: handleTouchStart,
                handleTouchEnd: handleTouchEnd
            };
            
        } else {
            // Desktop: esconder paginação
            pagination.style.display = 'none';
            pagination.innerHTML = '';
        }
    }
    
    // Inicialização imediata
    initSelosSwiper();
    
    // Garantir que funcione no DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initSelosSwiper, 100);
    });
    
    // Garantir que funcione no window load
    window.addEventListener('load', function() {
        setTimeout(initSelosSwiper, 200);
    });
    
    // Reinicializar no resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initSelosSwiper, 250);
    });
    
});