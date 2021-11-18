// carousel home section
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");

const carousel = document.querySelector(".carousel-container");
const dots = document.querySelectorAll(".dot");


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
            
    }
}
getPosts(postsEmbedUrl)

//function to create html and then call it inside async function
function creatHtml(result) {
    
    const date = new Date(result.date).toDateString();
    
    carouselContainer.innerHTML +=
        `<a href= "../blog-specific-page.html?id=${result.id}" class="blog">
            <img src="${result.jetpack_featured_media_url}" alt="${result}" />
            <h3>${result.title.rendered}</h3>
            <p> ${date}</p>
        </a>
         `;
   
}

// eventlistener for buttons
leftBtn.addEventListener("click", slideLeft);
rightBtn.addEventListener("click", slideRight);


function slideLeft() {
    carouselContainer.scrollBy({
        top:0,
        left:-250,
        behavior: 'smooth'
     });
}
function slideRight() {
    carouselContainer.scrollBy({
        top:0,
        left:250,
        behavior: 'smooth'
     });
}
