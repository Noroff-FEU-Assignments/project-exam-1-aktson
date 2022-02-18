import { displayMsg } from "../script.js";
import { postsEmbedUrl } from "../settings.js";



export async function fetchSearch() {
    try {
        const response = await fetch(postsEmbedUrl);
        const results = await response.json();

        getSearchResult(results)

    }
    catch (error) {
        displayMsg(error, "error-msg")
    }
}

// get search query async function
function getSearchResult(results) {

    //search icon event listner to show searc results   
    const searchResultContainer = document.querySelector(".search-result-container");
    const searchInput = document.querySelector("#search");

    searchInput.addEventListener("keyup", () => {
        const searchValue = event.target.value.trim().toLowerCase();
        searchResultContainer.classList.add("hidden");
        if (!searchValue) return;

        const searchResult = results.filter(result => {
            if (result.slug.includes(searchValue)) {
                return true;
            }
        });
        createSearchResult(searchResult);

        if (searchResult.length === 0) {
            searchResultContainer.innerHTML = "No results found";
        }

    });

    //creat search result html 
    function createSearchResult(results) {
        searchResultContainer.innerHTML = "";
        searchResultContainer.classList.remove("hidden")
        results.forEach(result => {

            searchResultContainer.innerHTML += `<a href= "../blog-specific-page.html?id=${result.id}" class="search-content">
                                                 <ul> <li>${result.title.rendered} <i class="fas fa-external-link-alt"></i></li></ul>
                                                </a>`
        })
    }
}