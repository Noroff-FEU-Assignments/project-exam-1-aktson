
import { getPosts } from "../getPosts.js";
import { getPages } from "../getPages.js";


//async function to fetch about section content

getPages(2, ".about-homepage");


// carousel home section
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");

//async function to fetch posts 
const carouselContainer = document.querySelector(".carousel-container");

//function to create html and then call it inside async function
function createHtmlCarousel(results) {

    carouselContainer.innerHTML = "";
    results.forEach(result => {
        let image = result.jetpack_featured_media_url;
        const date = new Date(result.date).toDateString();
        let defaultImage = "../../images/not-found.png";

        if (image) {
            defaultImage = image
        }

        carouselContainer.innerHTML +=
            `<a href= "../blog-specific-page.html?id=${result.id}" class="blog">
            <img src="${defaultImage}" alt="${result}" />
            <p>${result.title.rendered}</p>
            <p class = "date"><i>${date}</i></p>
        </a>
        `;
    })
}
getPosts(createHtmlCarousel);

// eventlistener for buttons to slide left or right  slider
leftBtn.addEventListener("click", slideLeft);
rightBtn.addEventListener("click", slideRight);

const deviceavailabelWidth = window.screen.availWidth;

function slideLeft() {
    carouselContainer.scrollBy({
        top: 0,
        left: -(carouselContainer.clientWidth),
        behavior: 'smooth'
    });
}

function slideRight() {

    carouselContainer.scrollBy({
        top: 0,
        left: carouselContainer.clientWidth,
        behavior: 'smooth'
    });
}
