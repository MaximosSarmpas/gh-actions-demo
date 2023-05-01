// Define an async function to handle the login form submission
const loginFormHandler = async function (event) {
   
   // Prevent the default form submission behavior
    event.preventDefault();
  
    // Get the username and password input elements from the form
    const usernameEl = document.querySelector("#username-input-login");
    const passwordEl = document.querySelector("#password-input-login");
    
    // Send a POST request to the server with the username and password in the request body
    fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            username: usernameEl.value,
            password: passwordEl.value
        }),
        headers: { "Content-Type": "application/json" }
    })
        .then(function () {
           
            // Redirect the user to the dashboard page upon successful login
            document.location.replace("/dashboard");
        })
        .catch(err => console.log(err));
  };
  
  // Attach an event listener to the login form submit button
  document
    .querySelector("#login-form")
    .addEventListener("submit", loginFormHandler);