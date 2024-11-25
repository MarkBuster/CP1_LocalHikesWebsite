/*    Name:             Mark Buster
      Date:             11-24-2024
      File:             app.test.js
      File Description: This test file operates using mocha test framework which determines
                        the pass/ fail of tests, chai which is the assertions library, supertets 
                        test http requests and nyc to show the final coverage of the testing.
*/
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app.js');


/**
 * This is the entire set of tests for API endpoints
 */
describe('API Endpoints', () => {

  /**
   * GET /posts tests
   */
  describe('GET /posts', () => {
    it('should return all posts', async () => {
      const res = await request(app)
        .get('/posts')
        .expect(200);
      
      expect(res.body).to.have.property('posts');
      expect(res.body.posts).to.be.an('array');
    });

    it('should have correctly structured post data', async () => {
      const res = await request(app)
        .get('/posts');
      
      const post = res.body.posts[0];
      expect(post).to.have.all.keys(
        'post_id',
        'content',
        'post_date',
        'image_path',
        'username',
        'comment_count',
        'comments'
      );
    });
  });

  /**
   * POST /posts tests
   */
  describe('POST /posts', () => {
    it('should create new post without image', async () => {
      const postData = {
        username: 'TestUser',
        content: 'Test post content'
      };

      const res = await request(app)
        .post('/posts')
        .send(postData)
        .expect(200);

      expect(res.body).to.have.property('post_id');
      expect(res.body.username).to.equal(postData.username);
      expect(res.body.content).to.equal(postData.content);
    });

    it('should return 400 when missing required fields', async () => {
      const invalidPost = {
        username: 'TestUser'
        // missing fields
      };

      await request(app)
        .post('/posts')
        .send(invalidPost)
        .expect(400);
    });
  });

  /**
   * POST /comments tests
   */
  describe('POST /comments', () => {
    it('should create new comment for existing user', async () => {
      const commentData = {
        username: 'TestUser',
        post_id: 1,
        comment_text: 'Test comment'
      };

      const res = await request(app)
        .post('/comments')
        .send(commentData)
        .expect(200);

      expect(res.body).to.have.property('comment_id');
    });

    it('should return 404 for non-existent user', async () => {
      const commentData = {
        username: 'NonExistentUser',
        post_id: 1,
        comment_text: 'Test comment'
      };

      await request(app)
        .post('/comments')
        .send(commentData)
        .expect(404);
    });
  });
});