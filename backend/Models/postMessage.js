const mongoose = require('mongoose') ;
// import mongoose from 'mongoose';
const postSchema = mongoose.Schema({
    fullName: String,
    class: String,
    course: String,
    title: String,
    note: String,
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

module.exports = mongoose.model('PostMessage', postSchema);


// export default PostMessage;