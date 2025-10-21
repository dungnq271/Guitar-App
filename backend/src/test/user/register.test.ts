import { TestFactory } from '../factory';

describe('Register user', () => {
  const factory: TestFactory = new TestFactory();

  beforeEach(() => {
    return factory.init();
  });

  afterEach(() => {
    return factory.close();
  });

  beforeEach(() => {
    return factory.app.post('/auth/register').set('content-type', 'application/json').send({
      firstName: 'dung',
      lastName: 'nguyen',
      username: 'leonard',
      email: 'dungnguyen2712002@gmail.com',
      password: 'Abc@123456'
    });
  });

  describe('Register an user with wrong passwords', () => {
    const userInfoPartial = {
      firstName: 'dung',
      lastName: 'nguyen',
      username: 'dung271',
      email: 'dungnguyen2712000@gmail.com'
    };

    it('should return error about empty password ', async () => {
      const res = await factory.app
        .post('/auth/register')
        .set('content-type', 'application/json')
        .send({
          ...userInfoPartial,
          password: ''
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Validation failed');
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors).toHaveProperty('password');
      expect(res.body.errors.password[0]).toBe('Password must not be empty');
    });

    it('should return error about password containing no special character ', async () => {
      const res = await factory.app
        .post('/auth/register')
        .set('content-type', 'application/json')
        .send({
          ...userInfoPartial,
          password: 'Abc123456'
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Validation failed');
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors).toHaveProperty('password');
      expect(res.body.errors.password[0]).toBe(
        'Password must contain at least one special character'
      );
    });

    it('should return error about password shorter than 8 characters ', async () => {
      const res = await factory.app
        .post('/auth/register')
        .set('content-type', 'application/json')
        .send({
          ...userInfoPartial,
          password: 'Abc@123'
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Validation failed');
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors).toHaveProperty('password');
      expect(res.body.errors.password[0]).toBe('Password must be at least 8 characters long');
    });

    it('should return error about password missing uppercase letters ', async () => {
      const res = await factory.app
        .post('/auth/register')
        .set('content-type', 'application/json')
        .send({
          ...userInfoPartial,
          password: 'albc@123'
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Validation failed');
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors).toHaveProperty('password');
      expect(res.body.errors.password[0]).toBe(
        'Password must contain at least one uppercase letter'
      );
    });

    it('should return error about password missing numbers ', async () => {
      const res = await factory.app
        .post('/auth/register')
        .set('content-type', 'application/json')
        .send({
          ...userInfoPartial,
          password: 'Albc@kjskfjk'
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Validation failed');
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors).toHaveProperty('password');
      expect(res.body.errors.password[0]).toBe('Password must contain at least one number');
    });

    it('should return error about password shorter than 8 characters and missing uppercase letter ', async () => {
      const res = await factory.app
        .post('/auth/register')
        .set('content-type', 'application/json')
        .send({
          ...userInfoPartial,
          password: 'abc@123'
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Validation failed');
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors).toHaveProperty('password');
      expect(res.body.errors.password).toEqual([
        'Password must be at least 8 characters long',
        'Password must contain at least one uppercase letter'
      ]);
    });

    it('should return error about password shorter than 8 characters, missing uppercase letter, and missing special character', async () => {
      const res = await factory.app
        .post('/auth/register')
        .set('content-type', 'application/json')
        .send({
          ...userInfoPartial,
          password: 'abc123'
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Validation failed');
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors).toHaveProperty('password');
      expect(res.body.errors.password).toEqual([
        'Password must be at least 8 characters long',
        'Password must contain at least one uppercase letter',
        'Password must contain at least one special character'
      ]);
    });
  });

  describe('Register an user with wrong emails', () => {
    const userInfoPartial = {
      firstName: 'dung',
      lastName: 'nguyen',
      username: 'dungnq',
      password: 'Abc@12345678'
    };

    it('should return error missing email ', async () => {
      const res = await factory.app
        .post('/auth/register')
        .set('content-type', 'application/json')
        .send({
          ...userInfoPartial,
          email: ''
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Validation failed');
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors).toHaveProperty('email');
      expect(res.body.errors.email[0]).toBe('Email is required');
    });

    it('should return error of invalid email ', async () => {
      const res = await factory.app
        .post('/auth/register')
        .set('content-type', 'application/json')
        .send({
          ...userInfoPartial,
          email: 'dungnguyen2712001'
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Validation failed');
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors).toHaveProperty('email');
      expect(res.body.errors.email[0]).toBe('Please provide a valid email address');
    });

    it('should return error of invalid email ', async () => {
      const res = await factory.app
        .post('/auth/register')
        .set('content-type', 'application/json')
        .send({
          ...userInfoPartial,
          email: 'abcdef@http.gmail.com'
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Validation failed');
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors).toHaveProperty('email');
      expect(res.body.errors.email[0]).toBe('Please provide a valid email address');
    });

    it('should return error of duplicate email ', async () => {
      const res = await factory.app
        .post('/auth/register')
        .set('content-type', 'application/json')
        .send({
          ...userInfoPartial,
          email: 'dungnguyen2712002@gmail.com'
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Email already in use');
    });
  });

  describe('Register an user with wrong usernames', () => {
    const userInfoPartial = {
      firstName: 'dung',
      lastName: 'nguyen',
      email: 'dungnguyen2712000@gmail.com',
      password: 'Abc@12345678'
    };

    it('should return error about empty username', async () => {
      const res = await factory.app
        .post('/auth/register')
        .set('content-type', 'application/json')
        .send({
          ...userInfoPartial,
          username: ''
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Validation failed');
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors).toHaveProperty('username');
      expect(res.body.errors.username).toEqual(['Username is required']);
    });

    it('should return error about duplicate username', async () => {
      const res = await factory.app
        .post('/auth/register')
        .set('content-type', 'application/json')
        .send({
          ...userInfoPartial,
          username: 'leonard'
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Username already exists');
    });
  });

  describe('Register an user successfully', () => {
    it('should return no error', async () => {
      const res = await factory.app
        .post('/auth/register')
        .set('content-type', 'application/json')
        .send({
          firstName: 'dung',
          lastName: 'nguyen',
          username: 'dung271',
          email: 'dungnguyen2712000@gmail.com',
          password: 'Abc@12345678'
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('User registered successfully');
    });
  });

  it('should return no error given long password', async () => {
    const res = await factory.app
      .post('/auth/register')
      .set('content-type', 'application/json')
      .send({
        firstName: 'dung',
        lastName: 'nguyen',
        username: 'dung271',
        email: 'dungnguyen2712000@gmail.com',
        password: '184782u42ujmjfkjf9u2918ujfjjjsjkj29@fajjAgjkbjkjkjksjiu29@2i4uiGgjkjw022849j'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User registered successfully');
  });
});
