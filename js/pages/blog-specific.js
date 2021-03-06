import { displayMsg } from "../script.js";
import { jwtApiToken, baseUrl } from "../settings.js";
import { removeSuccessMsg } from "../script.js";

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

        let defaultImage = "../../images/not-found.png";


        let image = result.jetpack_featured_media_url;
        let altText = result._embedded["wp:featuredmedia"][0].alt_text;



        const datePublished = new Date(result.date).toDateString();
        const dateModiefied = new Date(result.modified).toLocaleString();
        const author = result._embedded.author[0].name;


        title.innerText = `${result.title.rendered} | ${author.toUpperCase()}`

        if (image) {
            defaultImage = image
        }

        resultContainer.innerHTML = "";

        resultContainer.innerHTML = `
            <h1>${result.title.rendered}</h1>
           <img src="${defaultImage}" alt="${altText}" class = "received-image" /> 
            <p class= "date"><i class="fas fa-user-edit"></i>: <b>${author.toUpperCase()} </br></b> <i class="fas fa-calendar-alt"></i>: <b>${datePublished}</b></p>
            <p> ${result.content.rendered}</p>
            <p class= "date"> Last modified: <b>${dateModiefied}</b></p>
            `;

        //onclick function for image
        const receivedImage = document.querySelector(".received-image");
        const imageModal = document.querySelector(".img-modal");
        const closeImgBtn = document.querySelector(".img-close-btn");

        receivedImage.onclick = function expandModal(e) {
            imageModal.style.display = "flex";
            imageModal.innerHTML = `<img src= "${image}">`;
            closeImgBtn.style.display = "block";
        }
        //to close clicked image
        window.onclick = function (e) {
            if (e.target.classList.contains("img-modal")) {
                imageModal.style.display = "none";
            }
        }
        closeImgBtn.onclick = function () {
            imageModal.style.display = "none";
            closeImgBtn.style.display = "none";
        }
    }
    catch (error) {
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


const commentUrl = baseUrl + `comments?post=${blogId}`;

async function postComments(e) {
    e.preventDefault();

    if (!nameInput.value || !commentInput.value) {
        displayMsg("Please enter all fields to comment", "error-msg");
    }

    if (nameInput.value && commentInput.value) {

        const data = JSON.stringify({ author_name: nameInput.value, content: commentInput.value, status: "publish" })
        const options = {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtApiToken}`,
            },
        }

        try {
            const response = await fetch(commentUrl, options);

            const results = await response.json();

            form.reset();
            displayMsg("Your comment successfully posted!!", "success-msg");

            removeSuccessMsg();
            location.reload();
        }
        catch (error) {
            displayMsg("", "error-msg")
            console.log(error)
        }
    }
}
// get comments and show recent on page

const recentComntContainer = document.querySelector(".recent-comments");
(async function () {
    try {
        const response = await fetch(commentUrl);
        const results = await response.json();

        results.forEach(result => {
            recentComntContainer.innerHTML += ` 
                    <div class="flex comment-header">
                        <span><i class="fas fa-user-circle"></i></span>
                        <div>
                            <p>${result.author_name.toUpperCase()}</p>
                            <p>${result.date.toLocaleString()}</p>
                        </div>
                    </div>
                    <div class="user-comment"><p>${result.content.rendered}</p></div>`
        })
    }
    catch (error) {
        console.log(error)
    }
})();

