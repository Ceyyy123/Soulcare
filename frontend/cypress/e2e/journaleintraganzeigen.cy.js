describe('Journaleintrag anzeigen', () => {
  it('should display the saved journal entries', () => {
    // Zuerst anmelden
    cy.visit('/login'); // Besuche die Login-Seite
    cy.get('input[type="email"]').type('test@example.com'); // Gib die E-Mail-Adresse ein
    cy.get('input[type="password"]').type('123456'); // Gib das Passwort ein
    cy.get('button[type="submit"]').click(); // Klick auf "Anmelden" Button

    // Überprüfe, ob der Benutzer auf der Journalseite ist
    cy.url().should('eq', 'http://localhost:3000/', { timeout: 10000 });
    cy.visit('/journal');

    // Überprüfe, ob der gespeicherte Journaleintrag angezeigt wird
    // Hier geht es davon aus, dass der Text des Journaleintrags, der gespeichert wurde, auch sichtbar ist
    cy.contains('Dies ist mein erster Journaleintrag.').should('be.visible');  // Beispiel, dass der Text des Journaleintrags angezeigt wird
  });
});
