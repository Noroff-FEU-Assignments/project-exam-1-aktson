import { baseUrl } from "./settings.js";

const homePageUrl = baseUrl + "pages";

async function getAboutPage() {
    const response = await fetch(homePageUrl);
    const result = await response.json();
    aboutContainer.innerHTML = "";

    aboutContainer.innerHTML += ` <h2>${result.title.rendered}</h2>
                                <p>${result.content.rendered}</p> `
}