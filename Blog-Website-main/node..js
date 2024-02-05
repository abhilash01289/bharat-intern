const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = {
    title: String,
    body: String
};

const Post = mongoose.model('Post', postSchema);

app.get('/', (req, res) => {
    Post.find({}, (err, posts) => {
        if (!err) {
            res.render('index', { posts: posts });
        }
    });
});

app.get('/posts/:postId', (req, res) => {
    const requestedPostId = req.params.postId;

    Post.findOne({ _id: requestedPostId }, (err, post) => {
        if (!err) {
            res.render('post', { post: post });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

