// Importing the User, Post, and Comment models from their respective files
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Setting up the associations between the Post and User models
// A Post belongs to a User, with a foreign key of 'userId'
// When a User is deleted, all associated Posts should also be deleted (onDelete: 'CASCADE')
Post.belongsTo(User,  {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
// Setting up the associations between the Post and Comment models
// A Post has many Comments, with a foreign key of 'postId'
// When a Post is deleted, all associated Comments should also be deleted (onDelete: 'CASCADE')
Post.hasMany(Comment,  {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});
// Setting up the associations between the Comment and User models
// A Comment belongs to a User, with a foreign key of 'userId'
// When a User is deleted, all associated Comments should also be deleted (onDelete: 'CASCADE')
Comment.belongsTo(User,  {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
// Exporting the User, Comment, and Post models for use in other parts of the application
module.exports = {
    User,
    Comment, 
    Post
};