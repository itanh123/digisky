document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');

    // Xử lý cuộn trang để thay đổi độ trong suốt Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    /* --- Logic điều khiển Hero Slider --- */
    const sliderContainer = document.getElementById('hero-slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-btn-alt.prev');
    const nextBtn = document.querySelector('.slider-btn-alt.next');
    
    let currentIndex = 0;
    let autoplayInterval;

    function updateSlider(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        currentIndex = index;
        
        // Di chuyển khung chứa slide
        sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Cập nhật trạng thái các dấu chấm
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(() => {
            updateSlider(currentIndex + 1);
        }, 6000); // 6 giây tự động chuyển slide (giống website gốc)
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Lắng nghe sự kiện người dùng
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            updateSlider(currentIndex + 1);
            startAutoplay(); // Đặt lại thời gian tự động chạy
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            updateSlider(currentIndex - 1);
            startAutoplay(); // Đặt lại thời gian tự động chạy
        });
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            updateSlider(i);
            startAutoplay(); // Đặt lại thời gian tự động chạy
        });
    });

    // Tạm dừng khi di chuột vào Slider
    const sliderSection = document.querySelector('.hero-slider');
    if (sliderSection) {
        sliderSection.addEventListener('mouseenter', stopAutoplay);
        sliderSection.addEventListener('mouseleave', startAutoplay);
    }

    // Khởi tạo slider
    startAutoplay();

    // --- Logic cho Reveal Effect (IntersectionObserver) ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Nếu có counter bên trong thì chạy logic đếm
                const counter = entry.target.querySelector('.counter');
                if (counter && !counter.dataset.started) {
                    startCounter(counter);
                }
                
                // Ngừng quan sát sau khi đã reveal
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));

    function startCounter(target) {
        target.dataset.started = "true";
        const targetValue = parseInt(target.getAttribute('data-target'));
        let current = 0;
        
        const timer = setInterval(() => {
            current += Math.ceil(targetValue / 50);
            if (current >= targetValue) {
                target.innerText = targetValue + (target.innerText.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                target.innerText = current;
            }
        }, 30);
    }

    // --- Logic điều khiển Accordion Cards (Section 6) ---
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                // Xóa class active ở toàn bộ các thẻ khác
                projectCards.forEach(c => c.classList.remove('active'));
                // Thêm class active cho thẻ được click
                card.classList.add('active');
            });
        });
    }
});
