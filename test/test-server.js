const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Blogs', function () {

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  it('should list blogs entries on GET', function() {

  	return chai.request(app)
  		.get('/blog-posts')
  		.then(function (res){
  			res.should.have.status(200);
        	res.should.be.json;
        	res.body.should.be.a('array');
        	res.body.length.should.be.at.least(1);

        	const expectedKeys = ['id', 'title', 'content', 'author', 'publishDate']
        	res.body.forEach(function(item) {
        		item.should.be.a('object');
        		item.should.include.keys(expectedKeys);
        	});
  		});
  });

  it('should add a blog entry on POST', function() {

  	const newItem = {title: 'Blog 4', content: "Happiness is a choice. You can choose to be happy. There's going to be stress in life, but it's your choice whether you let it affect you or not. - Valerie Bertinelli", author: "Keneth Middleton"};

  	return chai.request(app)
  		.post('/blog-posts')
  		.send(newItem)
  		.then(function(res) {
  			res.should.have.status(201);
        	res.should.be.json;
        	res.body.should.be.a('object');
        	res.body.should.include.keys('id', 'title', 'content', 'author', 'publishDate');
        	res.body.id.should.not.be.null;
        	res.body.should.deep.equal(Object.assign(newItem, {id: res.body.id}, {publishDate: res.body.publishDate}));
      });

  });

  it("should update blog entries on PUT", function() {

  	const updateData = {
  		title: "TEST",
  		content: "THIS IS ONLY A TEST",
  		author: "Kenneth Middleton"
  	};

  	return chai.request(app)
  		.get('/blog-posts')
  		.then(function(res) {
  			updateData.id = res.body[0].id;
  			return chai.request(app)
  				.put(`/blog-posts/${updateData.id}`)
  				.send(updateData);
  		})
  		.then(function(res) {
  			res.should.have.status(204);
  		});
  });

  it("should delete blog entries on DELETE", function() {
  	return chai.request(app)
  		.get("/blog-posts")
  		.then(function(res) {
  			return chai.request(app)
  				.delete(`/blog-posts/${res.body[0].id}`);
  		})
  		.then(function(res) {
  			res.should.have.status(204);
  		});
  });	


});