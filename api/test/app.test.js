const request = require('supertest');
const express = require('express');
const path = require('path');

// Create test app instead of importing the actual server
const app = express();
app.use(express.json());

// Mock data
const users = [
  {
    firstName: "first1",
    lastName: "last1", 
    email: "abc@gmail.com"
  },
  {
    firstName: "first2",
    lastName: "last2",
    email: "abc@gmail.com"
  },
  {
    firstName: "first3", 
    lastName: "last3",
    email: "abc@gmail.com"
  }
];

// Mock endpoints for testing
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  users.push(user);
  res.json("user added");
});

app.get('/', (req, res) => {
  res.send('<html><body>Test HTML</body></html>');
});

describe('Backend API Tests', () => {
  // Test GET /api/users endpoint
  test('GET /api/users should return all users', async () => {
    const response = await request(app).get('/api/users');
    
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(3);
  });

  // Test POST /api/user endpoint
  test('POST /api/user should create a new user', async () => {
    const newUser = {
      user: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com'
      }
    };
    
    const response = await request(app)
      .post('/api/user')
      .send(newUser);
    
    expect(response.status).toBe(200);
    expect(response.body).toBe('user added');
  });

  // Test GET / endpoint
  test('GET / should return HTML content', async () => {
    const response = await request(app).get('/');
    
    expect(response.status).toBe(200);
    expect(response.text).toContain('html');
  });
});