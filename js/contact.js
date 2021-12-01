const form = document.querySelector("#feedback-form");
const name = document.querySelector("#your-name");
const email = document.querySelector("#your-email");
const subject = document.querySelector("#your-subject");
const message = document.querySelector("#your-message");

// const email = document.querySelector("form.email");
const namelabel = document.querySelector(".name-label");
const emaillabel = document.querySelector(".email-label");
const subjectlabel = document.querySelector(".subject-label");
const messagelabel = document.querySelector(".message-label");


// // function to check length of entered characheters, takes two value first for input value and second for number of characters
function checkLength(input, len) {
    if (input.trim().length >= len) {
        return true
    }
}

//function to show error first value to takes container(where to show error) and second to message you want to print
function showError(container, msg) {
    return container.innerHTML = `<p class= "error">${msg}</p>`
}

// function to check input value for email, first value is input, second is input container and third is message label tó display error and fourt for displayin error message.
function checkInputValue(input, inputContainer, labelContainer, msg) {
    if (!input) {
        labelContainer.innerHTML = "";
        labelContainer.innerHTML = `<p class= "error">${msg}</p>`;

    } else {
        labelContainer.innerHTML = "";
        labelContainer.classList.remove("error");
        inputContainer.classList.add("success");
    }
}
// submit event on form with async function 1. first checks value and gives error if input are not filled and if statement checks all inputs matches the length if passed, then runs async function to post data

form.addEventListener("submit", postFormData)

async function postFormData(e) {
    e.preventDefault();

    checkInputValue(checkLength(name.value, 5), name, namelabel, `name must be atleast 5 characters`);
    checkInputValue(checkValidEmail(email.value), email, emaillabel, "email not valid");
    checkInputValue(checkLength(subject.value, 15), subject, subjectlabel, `subject must be atleast 15 characters`);
    checkInputValue(checkLength(message.value, 25), message, messagelabel, `message must be atleast 25 characters`);
    displayMsg("One or more fields are missing", "error-msg");

    if (checkLength(name.value, 5) && checkValidEmail(email.value) && checkLength(subject.value, 15) && checkLength(message.value, 25)) {

        const form = e.currentTarget;
        const url = form.action;

        try {
            const formData = new FormData(form);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${jwtApiToken}`,
                },
                body: formData
            });

            form.reset();
            displayMsg("Your message was sent successfully", "success-msg");
            removeSuccessMsg();
        }
        catch (error) {
            console.log(error);
        }
    }
}


