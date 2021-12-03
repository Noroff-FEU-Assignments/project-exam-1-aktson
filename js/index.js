//async function to fetch about section content

const aboutContainer = document.querySelector(".about-homepage");
const homePageUrl = baseUrl + "pages/2";

async function getAboutPage() {
    const response = await fetch(homePageUrl);
    const result = await response.json();
    aboutContainer.innerHTML = `
    <h2>${result.title.rendered}</h2>
    <p>${result.content.rendered}</p>
    `
    console.log(result)
}
getAboutPage();

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
    const date = new Date(result.date).toDateString();

    carouselContainer.innerHTML +=
        `<a href= "../blog-specific-page.html?id=${result.id}" class="blog">
            <img src="${result.jetpack_featured_media_url}" alt="${result}" />
            <p>${result.title.rendered}</p>
            <p class = "date"><i>${date}</i></p>
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
