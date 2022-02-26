import { baseUrl } from "./settings.js";

export async function getPages(id, container) {

    const homePageUrl = baseUrl + `pages/${id}`;
    const element = document.querySelector(container)


    const response = await fetch(homePageUrl);
    const result = await response.json();

    element.innerHTML = "";

    element.innerHTML += ` <h2>${result.title.rendered}</h2>
                                <p>${result.content.rendered}</p> `
}