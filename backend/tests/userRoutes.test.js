const request = require('supertest');
const app = require('../server'); // Importiere die Server-App

describe('User Routes', () => {
    it('should return 200 for user login', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({ email: 'test@example.com', password: '123456' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });
    //einmal getestet zur Registrierung
    /*it('should return 201 for user signup', async () => {
        const res = await request(app)
            .post('/api/users/signup') // Registrierungs-Endpoint
            .send({ email: 'user@example.com', password: 'password123' }); // Testdaten für neuen Benutzer
    
        expect(res.statusCode).toBe(201); // Registrierung erfolgreich
        expect(res.body).toHaveProperty('message', 'User signuped successfully'); // Erwartete Antwort angepasst
    });*/
    
});
