// carousel home section
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");
const blogs = document.querySelectorAll(".blog");
const carousel = document.querySelector(".carousel-container");
const dots = document.querySelectorAll(".dot");


// eventlistener for buttons
leftBtn.addEventListener("click", slideLeft);
rightBtn.addEventListener("click", slideRight);

let count = 0;

function slideLeft() {
    count--;
    blogs.forEach(blog => {
            if(count === 0) {
            blog.style.transform = "translateX(0px)";
            dots[0].classList.add("active-dot");
            dots[1].classList.remove("active-dot");
            }
        if(count === 1){
            blog.style.transform = "translateX(-1010px)";
            dots[2].classList.remove("active-dot");
            dots[1].classList.add("active-dot");
            dots[0].classList.remove("active-dot");
            }
        if (count === 2) {
                blog.style.transform = "translateX(-2010px)";
                dots[1].classList.remove("active-dot");
                dots[2].classList.add("active-dot");
        }
        if (count < 0) { count = 0 };
    })
}

function slideRight() {
    count++;
    blogs.forEach(blog => {
            if(count === 0) {
            blog.style.transform = "translateX(0px)";
           
            }
        if(count === 1){
            blog.style.transform = "translateX(-1010px)";
            dots[1].classList.add("active-dot");
            dots[0].classList.remove("active-dot");
            }
        if (count === 2) {
                blog.style.transform = "translateX(-2020px)";
                dots[1].classList.remove("active-dot");
                dots[2].classList.add("active-dot");
        }
        if (count > 2) { count = 2 };
    })
}