import { baseUrl } from "../script.js";


//get blogs by categories
export function getBlogByCategory() {
    const categorySelect = document.querySelector("#category");
    const asideContainer = document.querySelector(".aside-content");

    categorySelect.addEventListener("change", getbyCat)
    async function getbyCat() {
        try {
            const catUrl = baseUrl + `posts?categories=${categorySelect.value}`;

            const response = await fetch(catUrl);
            const results = await response.json();

            asideContainer.innerHTML = "";

            if (!categorySelect.value) {
                asideContainer.innerHTML = "";

            }
            else {
                results.forEach(result => {
                    asideContainer.innerHTML += `<a href= "../blog-specific-page.html?id=${result.id}" class = "aside-content" >     
                                                    <div class = "aside-grid-tablet-mobile aside-div">
                                                        <p>${result.title.rendered}</p>
                                                        <img src="${result.jetpack_featured_media_url}" alt ="" />
                                                
                                                    </div>
                                                </a>`
                });
            }
        }
        catch (error) {
            displayMsg("", "error-msg")
            console.log(error)
        }

    }
    getbyCat();

}
