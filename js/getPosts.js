import { postsEmbedUrl } from "./settings.js";
import { displayMsg } from "./script.js";


export async function getPosts(createHtml) {
    try {
        const response = await fetch(postsEmbedUrl);
        const results = await response.json();
        createHtml(results)
    }
    catch (error) {
        displayMsg(error, "error-msg")
        console.log(error)
    }

};

