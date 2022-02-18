
async function fetchPosts(url) {
    try {
        const response = await fetch(url);
        const results = await response.json();

        creatHtml(results)
        getSearchResult(results)

    }
    catch (error) {
        displayMsg(error, "error-msg")
        console.log(error)
    }
}
