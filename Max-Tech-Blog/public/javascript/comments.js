// This function handles the submission of a new comment on a post.
const commentFormHandler = async function (event) {
    event.preventDefault();
// Retrieves the post ID and comment body from the input and textarea fields, respectively.
    const postId = document.querySelector('input[name="post-id"]').value;
    const body = document.querySelector('textarea[name="comment-body"]').value;
// If the comment body is not empty, sends a POST request to the server with the comment data.
    if (body) {
        await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                body
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
// Reloads the page to display the new comment.
        document.location.reload();
    }
};
// Adds an event listener to the "New Comment" form to call the commentFormHandler function when the form is submitted.
document
    .querySelector('#new-comment-form')
    .addEventListener('submit', commentFormHandler);