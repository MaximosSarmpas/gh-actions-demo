// This function handles the submission of a new post form
const newFormHandler = async function (event) {
    event.preventDefault();

   // Get the title and body of the post from the form input elements 
    const title = document.querySelector('input[name="post-title"]').value;
    const body = document.querySelector('textarea[name="post-body"]').value;

    // Get the user's authentication token from local storage
    const token = localStorage.getItem("token");
    
    // Send a POST request to the server to create a new post
    await fetch(`/api/post`, {
        method: "POST",
        body: JSON.stringify({
            title,
            body
        }),
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        }
    });

    // Redirect the user to the dashboard after the new post is created
    document.location.replace("/dashboard");
};

// Add an event listener to the new post form submission button
document
    .querySelector("#new-post-form")
    .addEventListener("submit", newFormHandler);