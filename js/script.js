const searchIcon = document.querySelector(".fa-search");
const searchInput = document.querySelector("#search");

const hamburger = document.querySelector(".hamburger");
const navigation = document.querySelector("nav");


hamburger.onclick = function() {

    hamburger.classList.toggle("rotate");

    if(navigation.style.display === "block") {
        return navigation.style.display = "none"
    } 
        return navigation.style.display = "block";

}
searchIcon.onclick = function() {
    console.log(searchInput.value);
}


// page on load loader function

const loader = document.querySelector(".loader");
const main = document.querySelector("main");


document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
           
        loader.style.visibility = "visible"
        main.style.display = "none" ;
      
           
    } else {
        setTimeout( function () {
        loader.style.display = "none";
         main.style.display= "block"}, 1000)
    }
   
}

