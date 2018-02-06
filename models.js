'use strict';

const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: {type: String, required: true},
  author: {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
  },
  content: {type: String, required: true},
  publishDate: Date
});

blogSchema.virtual('fullName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim()
});

blogSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    author: this.fullName,
    content: this.content,
    publishDate: this.publishDate
  };
}

const BlogPost = mongoose.model('BlogPost', blogSchema);

module.exports = {BlogPost};