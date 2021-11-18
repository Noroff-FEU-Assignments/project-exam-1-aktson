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


//to post comments
const commentInput = document.querySelector("#comment-input");
const nameInput = document.querySelector("#name");
const form = document.querySelector(".comment");


form.addEventListener("submit", postComments);

function postComments(e) {
    e.preventDefault();
    postCommentsApiCall() 

}
async function postCommentsApiCall() {

    const commentUrl = baseUrl + `comments?post=${blogId}`;

    const response = await fetch(commentUrl, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYW5rc29uLm5vXC9hbmtzb24tYmxvZyIsImlhdCI6MTYzNzEwMjYxNSwibmJmIjoxNjM3MTAyNjE1LCJleHAiOjE2Mzc3MDc0MTUsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.6X7bABakxn4eh4x52MannK9MZOqMCR9C7FZvt91CwKM",
        },
        body:JSON.stringify ({
            "name": nameInput.value,
            "content": commentInput.value,
            "status": "publish",
        })     
    });
    
    const results = await response.json();

    console.log(results)
}