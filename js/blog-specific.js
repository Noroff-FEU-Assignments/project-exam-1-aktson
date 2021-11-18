const title = document.querySelector("title");

const resultContainer = document.querySelector(".blog-result");
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const blogId = params.get("id");



// async function to blogs, id will be passed in from querystring to base url
async function getBlog() {
  try {
        const idUrl = baseUrl + `posts/${blogId}?_embed`;
        
        const response = await fetch(idUrl);
        const result = await response.json();
        

        const image = result.jetpack_featured_media_url;
        const datePublished = new Date(result.date).toDateString();
        const dateModiefied = new Date(result.modified).toDateString();
        const author = result._embedded.author[0].name;
        const altText = result._embedded["wp:featuredmedia"][0].alt_text;
console.log(datePublished)
        title.innerText = `MyBlog | ${result.title.rendered} | ${author}`
    
        resultContainer.innerHTML =
            `<h1>${result.title.rendered}</h1>
           
            <img src="${image}" alt="${altText}" class = "received-image" /> 
            <p class= "date">Author: <b>${author.toUpperCase()}</b> Published: <b>${datePublished}</b></p>
            <p> ${result.content.rendered}</p>
            <p class= "date"> Last modified: <b>${dateModiefied}</b></p>
           `;
    
        //onclick function for image
        const receivedImage = document.querySelector(".received-image");
        const imageModal = document.querySelector(".img-modal");
    
        receivedImage.onclick = function expandModal(e) {
            imageModal.style.display ="flex"
            imageModal.innerHTML =`<img src= "${image}">`;
        }

        //to close clicked image
        window.onclick = function(e) {
            if(e.target.classList.contains("img-modal")) {
                imageModal.style.display ="none";
            }
        }
  } 
  catch(error) {
       displayMsg(error, "error-msg")
        
  }
} 

getBlog();


