const title = document.querySelector("title");
const resultContainer = document.querySelector(".blog-result");

//get querystring parameter from id passed in 
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const blogId = params.get("id");



// async function to get specific blog, id will be passed in from querystring to base url
async function getBlog() {
  try {
        const idUrl = baseUrl + `posts/${blogId}?_embed`;
        
        const response = await fetch(idUrl);
        const result = await response.json();

        const image = result.jetpack_featured_media_url;
        const datePublished = new Date(result.date).toDateString();
        const dateModiefied = new Date(result.modified).toLocaleString();
        const author = result._embedded.author[0].name;
        const altText = result._embedded["wp:featuredmedia"][0].alt_text;

        title.innerText = `MyBlog | ${result.title.rendered} | ${author}`
     
        resultContainer.innerHTML =`
            <h1>${result.title.rendered}</h1>
            <img src="${image}" alt="${altText}" class = "received-image" /> 
            <p class= "date"><i class="fas fa-user-edit"></i>: <b>${author.toUpperCase()} </br></b> <i class="fas fa-calendar-alt"></i>: <b>${datePublished}</b></p>
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
    displayMsg(error, "error-msg");
    console.log(error)
        
  }
} 

getBlog();


//to post comments
const commentInput = document.querySelector("#comment-input");
const nameInput = document.querySelector("#name");
const form = document.querySelector(".comment-form");


form.addEventListener("submit", postComments);

function postComments(e) {
    e.preventDefault();
    postCommentsApiCall() 

}

const commentUrl = baseUrl + `comments?post=${blogId}`;

async function postCommentsApiCall() {
    
    if (!nameInput.value || !commentInput.value) {
        displayMsg("Please enter all fields to comment", "error-msg");
    }

    else if (nameInput.value && commentInput.value) {
        try {
            const response = await fetch (commentUrl, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer${jwtApiToken}`,
                },
                body:JSON.stringify ({
                
                    "author_name":  nameInput.value,
                    "content": commentInput.value,
                    "status": "publish",
                })     
            });
        
            const results = await response.json();
         
            displayMsg("Your comment successfully posted!!", "success-msg");
            form.reset();
            removeSuccessMsg();
        }
        catch(error) {
            displayMsg("", "error-msg")
            console.log(error)
        }      
    }   
}
// get comments and show recent on page

const recentComntContainer = document.querySelector(".recent-comments")
async function getComments () {

    const response = await fetch(commentUrl);
    const results = await response.json();

    let count = 10;
    for (let i = 0; i <= count; i++) {
        recentComntContainer.innerHTML += ` 
            <div class="flex comment-header">
                <span><i class="fas fa-user-circle"></i></span>
                <div>
                    <p>${results[i].author_name.toUpperCase()}</p>
                    <p>${results[i].date.toLocaleString()}</p>
                 </div>
            </div>
            <div class="user-comment"><p>${results[i].content.rendered}</p></div>`
    }
}

getComments();
