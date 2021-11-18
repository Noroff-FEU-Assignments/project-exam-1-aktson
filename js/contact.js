const form = document.querySelector("form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");




// const email = document.querySelector("form.email");
const nameSpan = document.querySelector(".name-span");
const emailSpan = document.querySelector(".email-span");
const subjectSpan = document.querySelector(".subject-span");
const messageSpan = document.querySelector(".message-span");



form.addEventListener("submit", checkForm);


function checkForm(e) {
    e.preventDefault();
      
    checkInputValue(checkLength(name.value, 5), name, nameSpan, `name must be atleast 5 characters`);
    checkInputValue(checkValidEmail(email.value), email,  emailSpan, "email not valid" );
    checkInputValue(checkLength(subject.value, 15), subject, subjectSpan, `subject must be atleast 15 characters`);
    checkInputValue(checkLength(message.value, 25), message, messageSpan, `message must be atleast 25 characters`);

    if (checkLength(name.value, 5) && checkValidEmail(email.value) && checkLength(subject.value, 15) && checkLength(message.value, 25)) {
       
        displayMsg("Your message was sent successfully", "success-msg")
        form.reset();
    }
}

// function to check length of entered characheters, takes two value first for input value and second for number of characters
function checkLength(input, len) {
    if (input.trim().length >= len) {
     return true
    }
}

//function to show error first value to takes container(where to show error) and second to message you want to print
function showError (container, msg) {
    return container.innerHTML = `<p class= "error">${msg}</p>`
} 


// check for valid email
function checkValidEmail (email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
   


// function to check input value for email, first value is input, second is input container and third is message span tó display error and fourt for displayin error message.
function checkInputValue (input, inputContainer, spanContainer, msg) {
    if (!input) {
        spanContainer.innerHTML ="";
       spanContainer.innerHTML = `<p class= "error">${msg}</p>`;

    } else {
        spanContainer.innerHTML ="";
        spanContainer.classList.remove("error");
        inputContainer.classList.add("success");
    }
}