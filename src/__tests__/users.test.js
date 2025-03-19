const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Das zu testende Modul importieren
const usersRouter = require('../pages/api/users');

// Mock des User-Modells
jest.mock('../models/User', () => {
  const mockUser = function (data) {
    Object.assign(this, data);
  };
  mockUser.findOne = jest.fn();
  mockUser.findById = jest.fn();
  mockUser.prototype.save = jest.fn();
  return mockUser;
});
const User = require('../models/User');

const app = express();
app.use(express.json());
app.use('/api/users', usersRouter);

describe('Users API', () => {
  let mongoServer;

  beforeAll(async () => {
    // Testumgebung vorbereiten
    process.env.JWT_SECRET = 'testsecret'; // Dummy-Token-Secret
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB verbunden');
  });

  afterAll(async () => {
    // Datenbankverbindung schließen
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('POST /signup', () => {
    it('should register a new user successfully', async () => {
      User.findOne.mockResolvedValue(null); // Benutzer existiert nicht
      User.prototype.save.mockResolvedValue(true); // Benutzer wird erfolgreich gespeichert

      const response = await request(app).post('/api/users/signup').send({
        email: 'test@example.com',
        password: 'Test123!',
      });

      if (response.status === 500) {
        console.error('Fehler bei der Registrierung:', response.body); // Fehler ausgeben
      }

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Benutzer erfolgreich registriert');
    });

    it('should return an error if the user already exists', async () => {
      User.findOne.mockResolvedValue({ email: 'test@example.com' }); // Benutzer existiert bereits

      const response = await request(app).post('/api/users/signup').send({
        email: 'test@example.com',
        password: 'Test123!',
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Benutzer existiert bereits');
    });
  });

  describe('POST /login', () => {
    it('should log in a user successfully', async () => {
      const hashedPassword = await bcrypt.hash('Test123!', 10);
      User.findOne.mockResolvedValue({
        _id: 'user123',
        email: 'test@example.com',
        password: hashedPassword,
      });

      const response = await request(app).post('/api/users/login').send({
        email: 'test@example.com',
        password: 'Test123!',
      });

      if (response.status === 500) {
        console.error('Fehler beim Login:', response.body); // Fehler ausgeben
      }

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Login erfolgreich');
      expect(response.body.token).toBeDefined();
    });

    it('should return an error for invalid credentials', async () => {
      User.findOne.mockResolvedValue(null); // Benutzer existiert nicht

      const response = await request(app).post('/api/users/login').send({
        email: 'test@example.com',
        password: 'WrongPassword',
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Ungültige Anmeldedaten');
    });
  });
});
