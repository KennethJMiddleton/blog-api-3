'use strict';

const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: {type: String, required: true},
  author: {
    {firstName: String, required: true},
    {lastName: String, required: true}
  }
  content: {type: String, required: true},
  publishDate: Date
});

blogSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`.trim()
});

restaurantSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    author: this.fullName,
    content: this.content,
    publishDate: this.publishDate
  };
}

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = {BlogPost};