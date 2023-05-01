// This function is triggered when the user submits the signup form
const signupFormHandler = async function (event) {
    event.preventDefault();

// Selects the username and password input fields from the form
    const usernameEl = document.querySelector("#username-input-signup");
    const passwordEl = document.querySelector("#password-input-signup");
   
   // Sends a POST request to the "/api/user" endpoint with the username and password as JSON data in the request body
    fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
            username: usernameEl.value,
            password: passwordEl.value
        }),
        headers: { "content-Type": "application/json" }
    })
        .then(function () {

                // If the request is successful, redirect the user to the dashboard page
            document.location.replace("/dashboard");
        })
        .catch(err => console.log(err));
};

// Attaches an event listener to the signup form that listens for the "submit" event and calls the signupFormHandler function
document
    .querySelector("#signup-form")
    .addEventListener("submit", signupFormHandler);