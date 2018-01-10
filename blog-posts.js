const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create(
	'Blog 1', 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...', 'Kenneth Middleton');
BlogPosts.create(
	'Blog 2', 'A man without ambition is like a beautiful worm--it can creep, but it cannot fly. - HENRY WARD BEECHER', 'Kenneth Middleton');
BlogPosts.create(
	'Blog 3', 'Dreaming permits each and every one of us to be quietly and safely insane every night of the week. - WILLIAM DEMENT', 'Kenneth Middleton');

router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  let item;
  if ('publishDate' in req.body) {
  item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
  }
  else {
  item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
  }
  res.status(201).json(item)});

router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog \`${req.params.ID}\``);
  res.status(204).end();
});

router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author', 'id'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog \`${req.params.id}\``);
  const updatedItem = BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  });
  res.status(204).end();
});

module.exports = router;