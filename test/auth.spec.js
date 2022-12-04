const request = require('supertest');
const app = require('../app');
const bcrypt = require('bcrypt');

const validator = require('fastest-validator');
const v = new validator();

//   Login
const user1 = {
  email: 'chosting63@gmail.com',
  password: bcrypt.hash('Password@123', 10),
};

const user2 = {
  email: 'kelompok5@gmail.com',
  password: bcrypt.hash('Password@123', 10),
};

const user3 = {
  email: 'chosting63@gmail.com',
  password: bcrypt.hash('Password123', 10),
};
describe('User Login Test', () => {
  test('Login User (Positive Test)', async () => {
    try {
      const res = await request(app).post('/api/v1/auth/login').send(user1);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe('login success!');
      expect(res.body.data.email).toBe(user1.email);
    } catch (err) {
      console.log({ error_message: err.message });
    }
  });
  test('Login User (Negative User not found Test)', async () => {
    try {
      const res = await request(app).post('/api/v1/auth/login').send(user2);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe('user not found!');
    } catch (err) {
      console.log({ error_message: err.message });
    }
  });
  test('Login User (Negative Wrong Password Test)', async () => {
    try {
      const res = await request(app).post('/api/v1/auth/login').send(user3);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe('wrong password!');
    } catch (err) {
      console.log({ error_message: err.message });
    }
  });
});

// register
const schema = {
  nama: 'string|required',
  email: 'email|required',
  password: 'string|required',
};
const register1 = {
  nama: 'kelompok 5',
  email: 'kelompok5@gmail.com',
  password: bcrypt.hash('Password@123', 10),
};
const validate = v.validate(register1, schema);
describe('User Register Test', () => {
  test('Login User (Positive Test)', async () => {
    try {
      const res = await request(app).post('/api/v1/auth/register').send(register1);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe('Success Register Data');
      expect(res.body.data.email).toBe(register1.email);
    } catch (err) {
      console.log({ error_message: err.message });
    }
  });
  test('Register User (Negative required Test)', async () => {
    try {
      const res = await request(app).post('/api/v1/auth/register').send();

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(validate);
    } catch (err) {
      console.log({ error_message: err.message });
    }
  });
  test('Register User (Negative required Test)', async () => {
    try {
      const res = await request(app).post('/api/v1/auth/register').send(register1);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe('Email already registered!');
    } catch (err) {
      console.log({ error_message: err.message });
    }
  });
});

// google oauth
const registerOauth = {
  nama: 'kelompok 5',
  email: 'kelompok5@gmail.com',
};
describe('google oauth Test', () => {
  test('google oauth (Positive Test)', async () => {
    try {
      const res = await request(app).post('/api/v1/auth/google').send(registerOauth);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe('successfully authentication with google oauth2');
      expect(res.body.data.email).toBe(registerOauth.email);
    } catch (err) {
      console.log({ error_message: err.message });
    }
  });
});

// forgot password
const forgotPassword = {
  email: 'chosting63@gmail.com',
};
const forgotPassword1 = {
  email: 'chosting631@gmail.com',
};
describe('forgot password Test', () => {
  test('forgot password (Positive Test)', async () => {
    try {
      const res = await request(app).post('/api/v1/auth/forgot-password').send(forgotPassword);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe('silahkan cek email anda');
      expect(res.body.data.email).toBe(forgotPassword.email);
    } catch (err) {
      console.log({ error_message: err.message });
    }
  });
  test('forgot password (Negative Test)', async () => {
    try {
      const res = await request(app).post('/api/v1/auth/forgot-password').send(forgotPassword1);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe('email lu gada');
    } catch (err) {
      console.log({ error_message: err.message });
    }
  });
});
// reset password
const resetPassword = {
  new_password: bcrypt.hash('Password@123', 10),
  confirm_new_password: bcrypt.hash('Password@123', 10),
};
const resetPassword1 = {
  new_password: bcrypt.hash('Password11@123', 10),
  confirm_new_password: bcrypt.hash('Password@123', 10),
};
describe('reset password Test', () => {
  test('reset password (Positive Test)', async () => {
    try {
      const res = await request(app).post('/api/v1/auth/reset-password').send(resetPassword);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe('Successfully Changed Password!');
      expect(res.body.data.email).toBe(resetPassword.email);
    } catch (err) {
      console.log({ error_message: err.message });
    }
  });
  test('reset password (Negative Test)', async () => {
    try {
      const res = await request(app).post('/api/v1/auth/reset-password').send(resetPassword1);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe('konfirmasi password harus sama dengan password baru');
    } catch (err) {
      console.log({ error_message: err.message });
    }
  });
});
