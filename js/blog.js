const blogsContainer = document.querySelector(".blogs-section");
const viewMoreBtn = document.querySelector(".view-more");


async function getBlogs() {
    const perPageUrl = baseUrl + `posts/?per_page=10&_embed`;

    try {
        const response = await fetch(perPageUrl);
        const results = await response.json();
    
        results.forEach(result=> {
            creatHtml(result)  
        })   
    } 
    catch (error) {
        displayMsg( "","error-msg")
    }
}
getBlogs();



// event listner to show 10 more posts 
viewMoreBtn.addEventListener("click", getBlogs);


//creates html inside async function
function creatHtml (result) {
    const date = new Date(result.date).toDateString();
    const altText = result._embedded["wp:featuredmedia"][0].alt_text;
  
    blogsContainer.innerHTML += 
        `<a href= "../blog-specific-page.html?id=${result.id}" class="article "> 
            <img src="${result.jetpack_featured_media_url}" alt="${altText}" />
            <div>
                <p class="date">${date}</p>
                <h2>${result.title.rendered}</h2>
                <div class ="line-height"><p> ${result.content.rendered}</p></div>
                <p class ="read-more">Read more </p>
            </div>
        </a>`
}

//get popular blogs in aside section
const aside = document.querySelector("aside");
getPopularBlogs(aside)