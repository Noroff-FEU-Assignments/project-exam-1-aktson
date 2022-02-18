
//creates html inside async function
export function createBlogPageHtml(results) {
    const blogsContainer = document.querySelector(".blogs-section");

    blogsContainer.innerHTML = "";

    results.forEach(result => {
        const date = new Date(result.date).toDateString();
        const altText = result._embedded["wp:featuredmedia"][0].alt_text;

        blogsContainer.innerHTML +=
            `<a href= "../blog-specific-page.html?id=${result.id}" class="article " "> 
            <img src="${result.jetpack_featured_media_url}" alt="${altText}" />
            <div>
                <p class="date">${date}</p>
                <h2>${result.title.rendered}</h2>
                <div class ="line-height"><p> ${result.content.rendered}</p></div>
                <p class ="read-more" >Read more </p>
            </div>
        </a>`
    })
}
