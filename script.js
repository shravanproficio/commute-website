document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Preloader & Scroll Lock Logic ---
    const preloader = document.getElementById('preloader');
    const preloaderVideo = document.getElementById('preloader-video');
    const body = document.body;

    const finishLoading = () => {
        if (preloader) {
            preloader.classList.add('loader-hidden');
        }
        body.classList.remove('loading');
        body.style.overflow = ''; // Restore default scroll behavior
    };

    // Only lock scroll if preloader exists on the current page
    if (preloader) {
        body.classList.add('loading');

        if (preloaderVideo) {
            // Hide when video ends
            preloaderVideo.onended = finishLoading;
            // Safety Fallback: 5 seconds
            setTimeout(finishLoading, 5000);
        } else {
            // If preloader div exists but no video, hide immediately
            finishLoading();
        }
    } else {
        // No preloader on this page (About/Privacy), ensure scroll is active
        finishLoading();
    }

    // --- 2. Navbar Shrink Logic ---
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('shrunk');
            } else {
                header.classList.remove('shrunk');
            }
        });
    }

    // --- 3. Dynamic Counter Logic ---
    const counters = document.querySelectorAll('.counter-value');
    
    if (counters.length > 0) {
        const animateCount = (counter) => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; 
            const frameRate = 1000 / 60; 
            const totalFrames = Math.round(duration / frameRate);
            let currentFrame = 0;

            const update = () => {
                currentFrame++;
                const progress = currentFrame / totalFrames;
                const easedProgress = 1 - Math.pow(1 - progress, 3); 
                const currentValue = Math.round(target * easedProgress);

                counter.innerText = currentValue.toLocaleString();

                if (currentFrame < totalFrames) {
                    requestAnimationFrame(update);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            requestAnimationFrame(update);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => observer.observe(c));
    }
});