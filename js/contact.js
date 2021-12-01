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

// submit event on form
form.addEventListener("submit", checkForm);

function checkForm(e) {

    e.preventDefault();

    checkInputValue(checkLength(name.value, 5), name, namelabel, `name must be atleast 5 characters`);
    checkInputValue(checkValidEmail(email.value), email, emaillabel, "email not valid");
    checkInputValue(checkLength(subject.value, 15), subject, subjectlabel, `subject must be atleast 15 characters`);
    checkInputValue(checkLength(message.value, 25), message, messagelabel, `message must be atleast 25 characters`);
    displayMsg("one or more fields are missing", "error-msg");

    if (checkLength(name.value, 5) && checkValidEmail(email.value) && checkLength(subject.value, 15) && checkLength(message.value, 25)) {

        displayMsg("Your message was sent successfully", "success-msg");
        postFormData();
        form.reset();
        removeSuccessMsg();
    }
}

// function to check length of entered characheters, takes two value first for input value and second for number of characters
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



// post contact form data
async function postFormData(e) {
    const formElement = document.querySelector("#feedback-form")
    const formData = new FormData(formElement);
    formData.append("your-name", name.value)
    formData.append("your-email", email.value)
    formData.append("your-subject", subject.value)
    formData.append("your-message", message.value)

    console.log(formData)

    const postUrl = "https://ankson.no/ankson-blog/wp-json/contact-form-7/v1/contact-forms/121/feedback";
    const response = await fetch(postUrl, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwtApiToken}`,
        },
        body: JSON.stringify(formData),
    })
    const result = await response.json();
    console.log(result);
}

postFormData();

