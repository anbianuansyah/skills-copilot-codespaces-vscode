// create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// create file
fs.writeFileSync('comments.json', '[]');

// get comments
app.get('/comments', (req, res) => {
  const comments = JSON.parse(fs.readFileSync('comments.json', 'utf-8'));
  res.json(comments);
});

// add comment
app.post('/comments', (req, res) => {
  const comments = JSON.parse(fs.readFileSync('comments.json', 'utf-8'));
  const comment = req.body.comment;
  comments.push(comment);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.json({status: 'success'});
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});