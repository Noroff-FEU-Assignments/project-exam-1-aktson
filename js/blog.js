import { displayMsg, postsEmbedUrl } from "./script.js";
import { getBlogByCategory } from "./generalFunctions/getBlogByCategory.js";
import { createBlogPageHtml } from "./generalFunctions/createBlogPageHtml.js";



const viewMoreBtn = document.querySelector(".view-more");


async function getBlogs() {

    try {
        const response = await fetch(postsEmbedUrl);
        const results = await response.json();

        createBlogPageHtml(results)

    }
    catch (error) {
        displayMsg("", "error-msg");
        console.log(error);
    }
}
getBlogs();

// getBlogByCategory();

// event listner to show 10 more posts 
viewMoreBtn.addEventListener("click", getBlogs);

