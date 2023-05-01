// Define the logout function
function logout() {
    
     // Send a POST request to the "/api/user/logout" endpoint
    fetch("/api/user/logout", {
        method: "post",
        headers: { "Content-Type": "application/json" }
    })
         // If the request is successful, redirect the user to the home page
        .then(function () {
            document.location.replace("/");
        })

         // If an error occurs, log it to the console
        .catch(err => console.log(err));
  }
  
  // Add an event listener to the logout link, so that when it's clicked, the logout function is called
  document.querySelector("#logout-link").addEventListener("click", logout);