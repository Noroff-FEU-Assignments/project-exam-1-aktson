// baseurl
const baseUrl = `https://ankson.no/ankson-blog/wp-json/wp/v2/`;
const postsEmbedUrl = "https://ankson.no/ankson-blog/wp-json/wp/v2/posts/?_embed";
const jwtApiToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYW5rc29uLm5vXC9hbmtzb24tYmxvZyIsImlhdCI6MTYzNzU3MDc2OSwibmJmIjoxNjM3NTcwNzY5LCJleHAiOjE2MzgxNzU1NjksImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.6kUomlZ_z6XcHccOXuK6upZjZJzkZEkYqJI5PS-NQZs";

//hamburger onclick event 
const hamburger = document.querySelector(".hamburger");
const navigation = document.querySelector("nav");
const navigationContainer = document.querySelector(".nav-search-container");

hamburger.addEventListener("click", showNav)

function showNav(e) {

    navigationContainer.classList.toggle("show-nav");
    if (hamburger.style.transform === "rotate(90deg)") {
        hamburger.style.transform = "rotate(0deg)";
    }
    else {
         hamburger.style.transform = "rotate(90deg)";
    } 
}


//search icon event listner to show searc results
const searchResultContainer = document.querySelector(".search-result-container");
const searchIcon = document.querySelector(".fa-search");
const searchInput = document.querySelector("#search");

searchInput.addEventListener("keyup", getSearchResult);
searchIcon.addEventListener("click", getSearchResult);

// get search query async function
async function getSearchResult () {
    
    const searchUrl = baseUrl + "posts/?_embed";
    
    const response = await fetch(searchUrl);
    const results = await response.json();

    const searchResult = results.filter( (result) => result.slug.includes(searchInput.value));
    searchResultContainer.innerHTML = "";
    searchResult.forEach(result => {
        
        if (!searchInput.value) {
                searchResultContainer.innerHTML = "";
                searchResultContainer.classList.add("hidden"); 
        }    
        if (!result) {
                searchResultContainer.innerHTML = "<p> Nothing has been found</p>";
                searchResultContainer.classList.remove("hidden"); 
        }
        else if (searchInput.value){
                searchResultContainer.classList.remove("hidden"); 
                searchResultContainer.innerHTML +=`
                <a href= "../blog-specific-page.html?id=${result.id}" class="search-content">
               <ul> <li>${result.title.rendered} <i class="fas fa-external-link-alt"></i></li></ul>
                </a>`
        }     
    });   
}


// page on load loader function
const loader = document.querySelector(".loader");
const main = document.querySelector("main");

document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
           
        loader.style.visibility = "visible"
        main.style.display = "none" ;
    } else {
        setTimeout( function () {
        loader.style.display = "none";
         main.style.display= "block"}, 1000)
    }
}

// global error container to show errors
const msgContainer = document.querySelector(".msg-container");

// function to shor error on error container
function displayMsg (msg, cls) {
    msgContainer.classList.remove("hidden");
    if(!msg) {
        msgContainer.innerHTML = `<p class ="${cls}"> Opps..something went wrong please try something else</p>`
    } else {
        msgContainer.innerHTML = `<p class ="${cls}"> ${msg}</p>`
    }
}

// after user succesfully sends data funtion under will remove message after 3 seconds that user can  continue to navigate or read
function removeSuccessMsg () {
        setTimeout(() => {
        msgContainer.classList.add("hidden");
    }, 5000)   
}


// button to in footer take user to top of the page
const toTopBtn = document.querySelector(".to-top-btn");

toTopBtn.onclick = function () {
    window.scrollTo ({
        top:0,
        left:0,
        behavior: "smooth"

    })
}

// check for valid email
function checkValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//get email from subscribe input and check input field
const subscribeInput = document.querySelector(".subscribe");
const subscribeForm = document.querySelector(".subscribe-form");

subscribeForm.addEventListener("submit", getSubscribeEmail)

function getSubscribeEmail (e) {
    e.preventDefault();
  
    if(checkValidEmail(subscribeInput.value)) {
        displayMsg ("Thank you for subscribing with us!!!", "success-msg");
        subscribeForm.reset();
        removeSuccessMsg();
    }
    else {
        displayMsg("Please enter valid e-mail", "error-msg");  
    } 
}


//get blogs by categories
const asideContainer = document.querySelector(".aside-content");

const categorySelect = document.querySelector("#category");

categorySelect.addEventListener("change", getBlogByCategory);

async function getBlogByCategory() {
  
    try {
        const url = baseUrl + `posts?categories=${categorySelect.value}`;

        const response = await fetch(url);
        const results = await response.json();
        
        asideContainer.innerHTML = "";

        if(!categorySelect.value) {
            asideContainer.innerHTML = "";

        } 
        else {
            results.forEach(result => {
        
                asideContainer.innerHTML += `
                     <a href= "../blog-specific-page.html?id=${result.id}" class = "aside-content" >     
                         <div class = "aside-grid-tablet-mobile aside-div">
                             <p>${result.title.rendered}</p>
                             <img src="${result.jetpack_featured_media_url}" alt ="" />
                       
                         </div>
                     </a>` 
            });
        }
    } 
    catch (error) {
        displayMsg( "" ,"error-msg")    
        console.log(error)
    }
}

     //  