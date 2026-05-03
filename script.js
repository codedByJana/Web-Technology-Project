document.addEventListener("DOMContentLoaded", function () {
    const orderForm = document.getElementById("orderForm");
    if (order) {
        order.addEventListener("submit", function (event) {
            event.preventDefault;
            document.getElementById("formContainer").style.display = "none";
            document.getElementById("successMessage").style.display = "block";
        })
    }
})


const carousel = document.getElementById('workshop-carousel');
function scrollCarousel(direction) {
    const slideWidth = carousel.clientWidth;
    carousel.scrollBy({ left: direction * slideWidth});

    setInterval(() => {
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
            carousel.scrollTo({ left: 0});
        } else {
            scrollCarousel(1);
        }
    }, 5000);
}
