describe('Impressum einsehen', () => {
  it('should display the imprint when clicked', () => {
    // Zuerst anmelden
    cy.visit('/login'); // Besuche die Login-Seite
    cy.get('input[type="email"]').type('test@example.com'); // Gib die E-Mail-Adresse ein
    cy.get('input[type="password"]').type('123456'); // Gib das Passwort ein
    cy.get('button[type="submit"]').click(); // Klick auf "Anmelden" Button
    
    // Warte, bis der Benutzer eingeloggt ist und zur Startseite geht
    cy.url().should('eq', 'http://localhost:3000/', { timeout: 10000 });  // Überprüfe, ob der Benutzer auf der Startseite ist
    
    // Klicke auf den Bereich für das Impressum
    cy.visit('/impressum'); // Klicke auf „Impressum“
  });
});
