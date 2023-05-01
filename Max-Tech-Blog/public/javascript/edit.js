// Get the value of the post ID from the input field
const postId = document.querySelector('input[name="post-id"]').value;

// Function to handle editing of a blog post
const editFormHandler = async function (event) {
    event.preventDefault();

// Get the values of the title and body input fields
    const title = document.querySelector('input[name="post-title"]').value;
    const body = document.querySelector('textarea[name="post-body"]').value;

    // Send a PUT request to the server with the updated post information
    await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Redirect the user to the dashboard after the post has been updated
    document.location.replace('/dashboard');
};

// Function to handle deletion of a blog post
const deleteClickHandler = async function () {
    
    // Send a DELETE request to the server to delete the post
    await fetch(`/api/post/${postId}`, {
        method: 'DELETE'
    });
// Redirect the user to the dashboard after the post has been deleted
    document.location.replace('/dashboard');
};

// Add event listeners to the edit form and delete button
document
    .querySelector('#edit-post-form')
    .addEventListener('submit', editFormHandler);
document
    .querySelector('#delete-btn')
    .addEventListener('click', deleteClickHandler);