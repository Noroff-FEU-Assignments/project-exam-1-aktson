const aside = document.querySelector("aside");

async function getBlogs() {
    const perPageUrl = baseUrl + `posts/?per_page=4&_embed`;

    try {
        const response = await fetch(perPageUrl);
        const results = await response.json();
    
        results.forEach(result=> {
            aside.innerHTML += 
            `<a href= "../blog-specific-page.html?id=${result.id}" class="aside-content" > 
                <div>
                    <h4>${result.title.rendered}</h4>
                
                </div>
            </a>`
        })   
    } 
    catch (error) {
        displayMsg( "" ,"error-msg")
    }
}
getBlogs()