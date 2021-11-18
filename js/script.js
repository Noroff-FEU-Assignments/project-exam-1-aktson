// baseurl
const baseUrl = `https://ankson.no/ankson-blog/wp-json/wp/v2/`;
const postsEmbedUrl = "https://ankson.no/ankson-blog/wp-json/wp/v2/posts/?_embed";

//hamburger onclick event 
const hamburger = document.querySelector(".hamburger");
const navigation = document.querySelector("nav");


hamburger.onclick = function() {

    hamburger.classList.toggle("rotate");

    if(navigation.style.display === "block") {
        return navigation.style.display = "none"
    } 
        return navigation.style.display = "block";
}


//search icon event listner to show searc results
const searchResultContainer = document.querySelector(".search-result-container");
const searchIcon = document.querySelector(".fa-search");
const searchInput = document.querySelector("#search");

searchInput.addEventListener("keyup", getSearchResult);

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
               <ul> <li>${result.title.rendered}</li></ul>
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
const errorContainer = document.querySelector(".msg-container");

// function to shor error on error container
function displayMsg (msg, cls) {
    errorContainer.classList.remove("hidden");
    if(!msg) {
        errorContainer.innerHTML = `<p class ="${cls}"> Opps..something went wrong please try something else</p>`
    } else {
        errorContainer.innerHTML = `<p class ="${cls}"> ${msg}</p>`
    }
    
    
}