import { baseUrl } from "./script.js";

const aboutContainer = document.querySelector(".about-sec");
const aboutUrl = baseUrl + "pages/24";

async function getAboutPage() {
    const response = await fetch(aboutUrl);
    const result = await response.json();
    aboutContainer.innerHTML = "";
    aboutContainer.innerHTML = `
    <h2>${result.title.rendered}</h2>
    <p>${result.content.rendered}</p>
     `
}
getAboutPage();

