import { fetchSearch } from "./generalFunctions/fetchSearch.js";


//common fetch
fetchSearch();

//hamburger onclick event 
const hamburger = document.querySelector(".hamburger");
const navigation = document.querySelector("nav");
const navigationContainer = document.querySelector(".nav-search-container");

hamburger.addEventListener("click", showNav)

function showNav() {

    navigationContainer.classList.toggle("show-nav");
    if (hamburger.style.transform === "rotate(180deg)") {
        hamburger.style.transform = "rotate(0deg)";
    }
    else {
        hamburger.style.transform = "rotate(180deg)";
    }
}

// page on load loader function
const loader = document.querySelector(".loader");
const body = document.querySelector("body");

document.onreadystatechange = function () {
    if (document.readyState !== "complete") {

        loader.style.visibility = "visible";
        body.style.display = "none";
    } else {
        loader.style.display = "none";
        body.style.display = "grid";

    }
}

// global error container to show errors
const msgContainer = document.querySelector(".msg-container-content");
const closeErrorBtn = document.querySelector(".msg-container-btn");

// function to shor error on error container
export function displayMsg(msg, cls) {
    msgContainer.classList.remove("hidden");
    closeErrorBtn.classList.remove("hidden");
    if (!msg) {
        msgContainer.innerHTML = `<p class ="${cls}"> Opps..something went wrong please try something else</p>`
    } else {
        msgContainer.innerHTML = `<p class ="${cls}"> ${msg}</p>`
    }
}
//function to close error msg
closeErrorBtn.addEventListener("click", (e) => {
    msgContainer.classList.add("hidden");
    closeErrorBtn.classList.add("hidden");
})

// after user succesfully sends data funtion under will remove message after 3 seconds that user can  continue to navigate or read
export function removeSuccessMsg() {
    setTimeout(() => {
        msgContainer.classList.add("hidden");
    }, 5000)
}


// button to in footer take user to top of the page
const toTopBtn = document.querySelector(".to-top-btn");

toTopBtn.onclick = function () {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"

    })
}

// check for valid email
export function checkValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//get email from subscribe input and check input field
const subscribeInput = document.querySelector(".subscribe");
const subscribeForm = document.querySelector(".subscribe-form");

subscribeForm.addEventListener("submit", getSubscribeEmail)

function getSubscribeEmail(e) {
    e.preventDefault();

    if (checkValidEmail(subscribeInput.value)) {
        displayMsg("Thank you for subscribing with us!!!", "success-msg");
        subscribeForm.reset();
        removeSuccessMsg();
    }
    else {
        displayMsg("Please enter valid e-mail to subscribe", "error-msg");
    }
}




