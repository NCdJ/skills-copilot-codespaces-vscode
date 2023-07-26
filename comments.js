// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public'));

// Parse JSON bodies
app.use(express.json());

// Create comment list
let comments = [
  {
    id: 1,
    name: 'Kitty',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    timestamp: '2021-09-18T17:07:05.000Z',
  },
  {
    id: 2,
    name: 'Puppy',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    timestamp: '2021-09-18T17:07:05.000Z',
  },
];

// Get all comments
app.get('/comments', (req, res) => {
  res.send(comments);
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const comment = comments.find((comment) => comment.id === id);
  res.send(comment);
});

// Create new comment
app.post('/comments', (req, res) => {
  const newComment = {
    id: comments.length + 1,
    name: req.body.name,
    comment: req.body.comment,
    timestamp: new Date().toISOString(),
  };
  comments = [...comments, newComment];
  res.send(comments);
});

// Update a comment by id
app.put('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const updatedComment = {
    id: id,
    name: req.body.name,
    comment: req.body.comment,
    timestamp: new Date().toISOString(),
  };
  comments = comments.map((comment) =>
    comment.id === id ? updatedComment : comment
  );
  res.send(comments);
});

// Delete a comment by id
app.delete('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  comments = comments.filter((comment) => comment.id !== id);
  res.send(comments);
});

// Listen to port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

