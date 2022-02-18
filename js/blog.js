
import { getBlogByCategory } from "./generalFunctions/getBlogByCategory.js";

import { getPosts } from "./getPosts.js";
import { isUndefined } from "./generalFunctions/isUndefined.js";

// event listner to show 10 more posts 
const viewMoreBtn = document.querySelector(".view-more");
viewMoreBtn.addEventListener("click", getPosts(createBlogPageHtml));
console.log(viewMoreBtn)


//creates html inside async function
export function createBlogPageHtml(results) {

    const blogsContainer = document.querySelector(".blogs-section");

    blogsContainer.innerHTML = "";

    results.forEach(result => {
        const date = new Date(result.date).toDateString();
        // const altText = result._embedded["wp:featuredmedia"][0].alt_text;
        // const image = result.jetpack_featured_media_url;


        let altText = result._embedded["wp:featuredmedia"][0].alt_text;
        let image = result.jetpack_featured_media_url;

        if (isUndefined(altText)) {
            altText = "Default alt text";
            console.log(altText)
        }
        if (isUndefined(image)) {
            image = "../images/not-found.png";
        }

        blogsContainer.innerHTML +=
            `<a href= "../blog-specific-page.html?id=${result.id}" class="article " "> 
            <img src="${image} " alt="${altText}" />
            <div>
                <p class="date">${date}</p>
                <h2>${result.title.rendered}</h2>
                <div class ="line-height"><p> ${result.content.rendered}</p></div>
                <p class ="read-more" >Read more </p>
            </div>
        </a>`
    })
}

//calling functions
getPosts(createBlogPageHtml)
getBlogByCategory();