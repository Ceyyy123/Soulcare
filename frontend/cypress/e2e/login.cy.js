describe('Login Functionality', () => {
  it('should log in successfully with valid credentials', () => {
    // Besuche die Login-Seite
    cy.visit('/login');

    // Gib die Anmeldedaten ein
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('123456');

    // Klicke auf den Login-Button
    cy.get('button[type="submit"]').click();

    // Überprüfe, ob der Benutzer erfolgreich eingeloggt ist
    cy.url().should('eq', 'http://localhost:3000/', { timeout: 10000 }); // Überprüfe, ob die URL auf localhost:3000/ bleibt
    cy.contains('Willkommen').should('be.visible'); // Beispieltext
  });
});

