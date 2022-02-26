import { baseUrl } from "../settings.js";
import { displayMsg } from "../script.js";
import { createBlogPageHtml } from "../pages/blog.js";
import { getPosts } from "../getPosts.js";

//get blogs by categories
export function getBlogByCategory() {
    const categorySelect = document.querySelector("#category");

    categorySelect.addEventListener("change", getbyCat);

    async function getbyCat() {
        try {
            const catUrl = baseUrl + `posts?categories=${categorySelect.value}&_embed`;

            const response = await fetch(catUrl);
            const results = await response.json();



            if (categorySelect.value === "") {
                getPosts(createBlogPageHtml);
            }
            if (!categorySelect.value) return;

            createBlogPageHtml(results);


        }
        catch (error) {
            displayMsg("", "error-msg")
            console.log(error)
        }
    }

}
