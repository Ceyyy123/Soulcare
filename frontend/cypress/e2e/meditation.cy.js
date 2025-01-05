describe('Geführte Meditation starten', () => {
  it('should start and control the guided meditation', () => {
    // Zuerst anmelden
    cy.visit('/login'); // Besuche die Login-Seite
    cy.get('input[type="email"]').type('test@example.com'); // Gib die E-Mail-Adresse ein
    cy.get('input[type="password"]').type('123456'); // Gib das Passwort ein
    cy.get('button[type="submit"]').click(); // Klick auf "Anmelden" Button

    // Warte, bis der Benutzer eingeloggt ist und zur Meditationsseite geht
    cy.url().should('eq', 'http://localhost:3000/', { timeout: 10000 });  // Überprüfe, ob die Seite auf Dashboard umgeleitet wurde

    // Gehe zur Meditationsseite
    cy.visit('/meditation'); // Stelle sicher, dass der Benutzer auf der Meditationsseite ist

    // Überprüfe, ob das Video sichtbar ist
    cy.get('video').should('be.visible'); // Stelle sicher, dass das Video geladen ist

  });
});
