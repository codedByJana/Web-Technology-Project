document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. HEADER LOGIC (Applies to all pages)
    // ==========================================
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('compact');
            } else {
                header.classList.remove('compact');
            }
        });
    }

    // ==========================================
    // 2. WORKSHOPS PARALLAX SLIDER (Home Page)
    // ==========================================
    const wsTrack = document.getElementById('workshop-track');
    const wsLeft = document.getElementById('ws-left');
    const wsRight = document.getElementById('ws-right');
    const wsContainer = document.querySelector('.workshop-carousel-container');

    if (wsTrack && wsLeft && wsRight) {
        const getSlideWidth = () => wsTrack.clientWidth;

        wsLeft.addEventListener('click', () => {
            wsTrack.scrollBy({ left: -getSlideWidth(), behavior: 'smooth' });
        });

        wsRight.addEventListener('click', () => {
            wsTrack.scrollBy({ left: getSlideWidth(), behavior: 'smooth' });
        });

        let autoScrollInterval;

        const startAutoScroll = () => {
            autoScrollInterval = setInterval(() => {
                if (wsTrack.scrollLeft + wsTrack.clientWidth >= wsTrack.scrollWidth - 10) {
                    wsTrack.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    wsTrack.scrollBy({ left: getSlideWidth(), behavior: 'smooth' });
                }
            }, 5000); // Auto-scroll every 5 seconds
        };

        const stopAutoScroll = () => {
            clearInterval(autoScrollInterval);
        };

        startAutoScroll();

        // Stop auto-scroll on hover, resume on mouse leave
        wsContainer.addEventListener('mouseenter', stopAutoScroll);
        wsContainer.addEventListener('mouseleave', startAutoScroll);
    }

    // ==========================================
    // 3. REGISTRATION FORM LOGIC (Workshops Page)
    // ==========================================
    const regForm = document.getElementById("regForm");
    const successMessage = document.getElementById("successMessage");
    const regModalTitle = document.getElementById("modal-title");


    if (regForm) {
        regForm.addEventListener("submit", function (event) {
            event.preventDefault();
            regForm.style.display = "none";
            regModalTitle.style.display = "none";
            successMessage.style.display = "block";

            setTimeout(() => {
                closeRegModal();
                setTimeout(() => {
                    regForm.reset();
                    regForm.style.display = "block";
                    regModalTitle.style.display = "block";
                    successMessage.style.display = "none";
                }, 400);
            }, 3000);
        });
    }

    // ==========================================
    // 4. REGISTRATION MODAL LOGIC (Workshops Page)
    // ==========================================
    const regModal = document.getElementById('reg-modal');
    const workshopInput = document.getElementById('workshop-selection');

    if (regModal) {
        window.openModal = function (workshopName, workshopDate) {

            workshopInput.value = workshopName;
            regModalTitle.innerText = "Register for " + workshopName + " workshop!";


            const dateInput = document.getElementById('workshop-date');
            
            if (dateInput) {
                if (workshopDate) {
                    let date = new Date(workshopDate);
                    if (!isNaN(date.getTime())) {
                        dateInput.value = date.toISOString().split('T')[0];
                    }
                } else {
                    dateInput.value = "";
                }
            }
            regModal.showModal();
        };

        window.closeRegModal = function () {
            regModal.classList.add('closing');
            setTimeout(() => {
                regModal.close();
                regModal.classList.remove('closing');
            }, 400);
        };

        regModal.addEventListener('click', (e) => {
            const dialogDimensions = regModal.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                closeRegModal();
            }
        });
    }

    // ==========================================
    // 5. BANNER CAROUSEL LOGIC (Home Page)
    // ==========================================
    const carousel = document.getElementById('workshop-carousel');

    if (carousel) {
        function scrollCarousel(direction) {
            const slideWidth = carousel.clientWidth;
            carousel.scrollBy({ left: direction * slideWidth });
        }
        setInterval(() => {
            if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
                carousel.scrollTo({ left: 0 });
            } else {
                scrollCarousel(1);
            }
        }, 5000);
    }

    // ==========================================
    // 6. QUICK VIEW MODAL LOGIC (Catalog Page)
    // ==========================================
    const quickViewModal = document.getElementById('quick-view-modal');
    const closeQuickViewBtn = document.getElementById('close-quick-view');
    const quickViewTriggers = document.querySelectorAll('.quick-view-trigger');

    const modalImg = document.getElementById('modal-product-img');
    const modalProductTitle = document.getElementById('modal-product-title');
    const modalPrice = document.getElementById('modal-product-price');
    const modalCategory = document.getElementById('modal-product-category');
    const modalDesc = document.getElementById('modal-product-desc');
    const modalWhatsapp = document.getElementById('modal-whatsapp-btn');

    if (quickViewModal) {

        quickViewTriggers.forEach(button => {
            button.addEventListener('click', function () {
                const title = this.getAttribute('data-title');
                const price = this.getAttribute('data-price');
                const category = this.getAttribute('data-category');
                const imgSrc = this.getAttribute('data-img');
                const desc = this.getAttribute('data-desc');

                modalProductTitle.innerText = title;
                modalPrice.innerText = price;
                modalCategory.innerText = category;
                modalImg.src = imgSrc;
                modalDesc.innerText = desc;

                const phoneNumber = "201000000000";
                const message = encodeURIComponent(`Hello! I am interested in the ${title} (${price}).`);
                modalWhatsapp.href = `https://wa.me/${phoneNumber}?text=${message}`;

                quickViewModal.showModal();
            });
        });

        function closeQuickView() {
            quickViewModal.classList.add('closing');
            setTimeout(() => {
                quickViewModal.close();
                quickViewModal.classList.remove('closing');
            }, 400);
        }

        closeQuickViewBtn.addEventListener('click', closeQuickView);

        quickViewModal.addEventListener('click', (e) => {
            const dialogDimensions = quickViewModal.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                closeQuickView();
            }
        });
    }

});