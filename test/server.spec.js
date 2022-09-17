const request = require('supertest');
const server = require('../src/server');
const { expect } = require('chai');

let token;

before(async function() {
  const result = await request(server)
    .post('/api/v1/users/login')
    .send({
      email: 'test1@email.com',
      password: '123456'
    })
    .then(res => {
      token = res.body.token;
    });
});

describe('Bookmark APIs Test', () => {
  describe('## Get My Bookmark', () => {
    it('should return the task successfully', async function() {
      const result = await request(server)
        .get('/api/v1/bookmark')
        .set({ Authorization: `Bearer ${token}` })
        .then(res => {
          expect(res.body).to.exist;
        });
    });
  });

  describe('## Add Bookmark', () => {
    it('should return the task successfully', async function() {
      const result = await request(server)
        .post('/api/v1/bookmark/5')
        .set({ Authorization: `Bearer ${token}` })
        .then(res => {
          expect(res.status).to.equal(201);
        });
    });
  });
});

describe('Clap APIs Test', () => {
  describe('## Get Story Clap By ID', () => {
    it('should return the task successfully', async function() {
      const result = await request(server)
        .get('/api/v1/clap/stories/5')
        .set({ Authorization: `Bearer ${token}` })
        .then(res => {
          expect(res.body).to.exist;
        });
    });
  });

  describe('## Get User Clap For Story', () => {
    it('should return the task successfully', async function() {
      const result = await request(server)    
        .get('/api/v1/clap/stories/users/3')
        .set({ Authorization: `Bearer ${token}` })
        .then(res => {
          expect(res.body).to.exist;
        });
    });
  });

  describe('## Clap for Story', () => {
    it('should return the clapped task successfully', async function() {
      const result = await request(server)
        .post('/api/v1/clap/stories/5')
        .set({ Authorization: `Bearer ${token}` })
        .then(res => {
          expect(res.status).to.equal(201);
        });
    });
  });

  describe('## Clap for Comment', () => {
    it('should return the clapped task successfully', async function() {
      const result = await request(server)
        .post('/api/v1/clap/comments/1')
        .set({ Authorization: `Bearer ${token}` })
        .then(res => {
          expect(res.status).to.equal(201);
        });
    });
  });
});

describe('Comment APIs Test', () => {
  describe('## Get All Comment', () => {
    it('should return the task successfully', async function() {
      const result = await request(server)
        .get('/api/v1/comments/stories/5')
        .set({ Authorization: `Bearer ${token}` })
        .then(res => {
          expect(res.body).to.exist;
        });
    });
  });

  describe('## Create Comment', () => {
    it('should return the created task successfully', async function() {
      const result = await request(server)
        .post('/api/v1/comments')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          target_id: '2',
          parent_id: '1',
          content: 'A create test of UNIT TEST'
        })
        .then(res => {
          expect(res.status).to.equal(201);
        });
    });
  });

  describe('## Update Comment', () => {
    it('should return the updated task successfully', async function() {
      const result = await request(server)
        .patch('/api/v1/comments/1')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          content: 'An update test of UNIT TEST'
        })
        .then(res => {
          expect(res.status).to.equal(201);
        });
    });
  });

  describe('## Delete Comment', () => {
    it('should return the deleted task successfully', async function() {
      const result = await request(server)
        .delete('/api/v1/comments/9')
        .set({ Authorization: `Bearer ${token}` })
        .then(res => {
          expect(res.status).to.equal(201);
        });
    });
  });

  describe('## Get All Replies', () => {
    it('should return the task successfully', async function() {
      const result = await request(server)
        .get('/api/v1/comments/2/replies')
        .set({ Authorization: `Bearer ${token}` })
        .then(res => {
          expect(res.body).to.exist;
        });
    });
  });
});

describe('Follow APIs Test', () => {
  describe('## Get Followers', () => {
    it('should return the task successfully', async function() {
      const result = await request(server)
        .get('/api/v1/follow/users/3')
        .set({ Authorization: `Bearer ${token}` })
        .then(res => {
          expect(res.body).to.exist;
        });
    });
  });

  describe('## Get Follows', () => {
    it('should return the task successfully', async function() {
      const result = await request(server)
        .get('/api/v1/follow/users/followers/3')
        .set({ Authorization: `Bearer ${token}` })
        .then(res => {
          expect(res.body).to.exist;
        });
    });
  });

  describe('## Follow Users', () => {
    it('should return the task successfully', async function() {
      const result = await request(server)
        .post('/api/v1/follow/users/4')
        .set({ Authorization: `Bearer ${token}` })
        .then(res => {
          expect(res.status).to.equal(201);
        });
    });
  });
});

describe('Story APIs Test', () => {
  describe('## Get All Stories', () => {
    it('should return the task successfully', async function() {
      const result = await request(server)
        .get('/api/v1/stories')
        .then(res => {
          expect(res.body).to.exist;
        });
    });
  });

  describe('## Get Story By ID', () => {
    it('should return the task successfully', async function() {
      const result = await request(server)
        .get('/api/v1/stories/5')
        .set({ Authorization: `Bearer ${token}` })
        .then(res => {
          expect(res.body).to.exist;
        });
    });
  });

  describe('## Create Story', () => {
    it('should return the created task successfully', async function() {
      const result = await request(server)
        .post('/api/v1/stories')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          is_premium: '0',
          title: 'A create test of UNIT TEST',
          content: 'content / A create test of UNIT TEST'
        })
        .then(res => {
          expect(res.status).to.equal(201);
        });
    });
  });

  describe('## Update Story', () => {
    it('should return the updated task successfully', async function() {
      const result = await request(server)
        .patch('/api/v1/stories/1')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          content: 'An update test of UNIT TEST'
        })
        .then(res => {
          expect(res.status).to.equal(200);
        });
    });
  });

  describe('## Delete Story', () => {
    it('should return the deleted task successfully', async function() {
      const result = await request(server)
        .delete('/api/v1/stories/9')
        .set({ Authorization: `Bearer ${token}` })
        .then(res => {
          expect(res.status).to.equal(201);
        });
    });
  });
});

describe('User APIs Test', () => {
  describe('## Get All Users', () => {
    it('should return the task successfully', async function() {
      const result = await request(server)
        .get('/api/v1/users')
        .then(res => {
          expect(res.body).to.exist;;
        });
    });
  });

  describe('## Get User By ID', () => {
    it('should return the task successfully', async function() {
      const result = await request(server)
        .get('/api/v1/users/2')
        .set({ Authorization: `Bearer ${token}` })
        .then(res => {
          expect(res.body).to.exist;
        });
    });
  });

  describe('## Get My Profile', () => {
    it('should return the task successfully', async function() {
      const result = await request(server)
        .get('/api/v1/users/whoami')
        .set({ Authorization: `Bearer ${token}` })
        .then(res => {
          expect(res.body).to.exist;
        });
    });
  });

  describe('## Create User', () => {
    it('should return the created task successfully', async function() {
      const result = await request(server)
        .post('/api/v1/users')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          email: 'test22@email.com',
          password: '123456',
          confirm_password: '123456',
          first_name: 'Emily',
          last_name: 'Cat',
          role: 'General',
          age: '25',
          about: 'An user create test of UNIT TEST'
        })
        .then(res => {
          expect(res.status).to.equal(201);
        });
    });
  });

  describe('## Update User', () => {
    it('should return the updated task successfully', async function() {
      const result = await request(server)
        .patch('/api/v1/users/3')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          about: 'An user update test of UNIT TEST'
        })
        .then(res => {
          expect(res.status).to.equal(200);
        });
    });
  });

  describe('## Delete User', () => {
    it('should return the deleted task successfully', async function() {
      const result = await request(server)
        .delete('/api/v1/users/9')
        .set({ Authorization: `Bearer ${token}` })
        .then(res => {
          expect(res.status).to.equal(201);
        });
    });
  });
});

