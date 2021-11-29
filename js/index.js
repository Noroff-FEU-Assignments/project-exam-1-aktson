// carousel home section
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");

const carousel = document.querySelector(".carousel-container");

//async function to fetch posts 
const carouselContainer = document.querySelector(".carousel-container");

async function getPosts(url) {
    try {
        const response = await fetch(url);
        const results = await response.json();

        results.forEach(result => {
            creatHtml(result)
        })
    }
    catch (error) {
        displayMsg(error, "error-msg")
        console.log(error)
    }
}
getPosts(postsEmbedUrl)

//function to create html and then call it inside async function
function creatHtml(result) {

    carouselContainer.innerHTML +=
        `<a href= "../blog-specific-page.html?id=${result.id}" class="blog">
            <img src="${result.jetpack_featured_media_url}" alt="${result}" />
            <p>${result.title.rendered}</p>
        </a>
        `;
}


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

