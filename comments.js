// Create web server

// 1. Create a new web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const comments = require('./comments');
const port = 3000;

// 2. Create a new router
const router = express.Router();

// 3. Create a new route
router.get('/', (req, res) => {
    res.json(comments.getComments());
});

router.post('/', (req, res) => {
    const comment = req.body.comment;
    comments.addComment(comment);
    res.status(201).send();
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    comments.deleteComment(id);
    res.status(204).send();
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const comment = req.body.comment;
    comments.updateComment(id, comment);
    res.status(204).send();
});

// 4. Add a new comment
comments.addComment('Hello world');

// 5. Get a list of comments
console.log(comments.getComments());

// 6. Delete a comment
comments.deleteComment(0);

// 7. Update a comment
comments.updateComment(1, 'Hello world!');

// 8. Start the server
app.use(bodyParser.json());
app.use('/comments', router);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// 9. Listen for requests
// curl http://localhost:3000/comments
// curl -X POST -H 'Content-Type: application/json' -d '{"comment": "Hello world"}' http://localhost:3000/comments
// curl -X DELETE http://localhost:3000/comments/0
// curl -X PUT -H 'Content-Type: application/json' -d '{"comment": "Hello world!"}' http://localhost:3000/comments/1