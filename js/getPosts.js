import { postsEmbedUrl } from "./settings.js";
import { displayMsg } from "./script.js";


export async function getPosts(createHtml) {
    try {
        const response = await fetch(postsEmbedUrl);
        const results = await response.json();
        createHtml(results)
    }
    catch (error) {
        displayMsg("Something went wrong, can't fetch posts!!", "error-msg")
        console.log(error)
    }

};

