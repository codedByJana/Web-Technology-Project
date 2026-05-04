document.addEventListener("DOMContentLoaded", function () {
    const regForm = document.getElementById("regForm");
    const successMessage = document.getElementById("successMessage");
    const modalTitle = document.getElementById("modal-title");
    if (regForm) {
        regForm.addEventListener("submit", function (event) {
            event.preventDefault();
            regForm.style.display = "none";
            modalTitle.style.display = "none";
            successMessage.style.display = "block";

            setTimeout(() => {
                closeModal();
                setTimeout(() => {
                    regForm.reset();
                    regForm.style.display = "block";
                    modalTitle.style.display = "block";
                    successMessage.style.display = "none";
                }, 400);
            }, 3000);
            document.getElementById("regForm").style.display = "none";
            document.getElementById("successMessage").style.display = "block";
        })
    }
})


const carousel = document.getElementById('workshop-carousel');
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


const modal = document.getElementById('reg-modal');
const workshopInput = document.getElementById('workshop-selection');
const modalTitle = document.getElementById('modal-title');

function openModal(workshopName) {
    workshopInput.value = workshopName;
    modalTitle.innerText = "Register for " + workshopName + " workshop!";
    modal.showModal();
}

function closeModal() {
    modal.classList.add('closing')

    setTimeout(() => {
        modal.close();
        modal.classList.remove('closing')

    }, 400);
}

modal.addEventListener('click', (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        closeModal();
    }
})