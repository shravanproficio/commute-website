document.addEventListener('DOMContentLoaded', () => {
    
    //  1. Navbar Shrink Logic 
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shrunk');
        } else {
            header.classList.remove('shrunk');
        }
    });

    // Dynamic Counter Logic 
    const counters = document.querySelectorAll('.counter-value');
    
    const animateCount = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // Total animation time in ms
        const frameRate = 1000 / 60; // 60 fps
        const totalFrames = Math.round(duration / frameRate);
        let currentFrame = 0;

        const update = () => {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            // Easing function for smoother finish
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

    // Trigger counters only when they enter the viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
});