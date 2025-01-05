describe('Journaleintrag löschen', () => {
  it('should delete a saved journal entry', () => {
    // Zuerst anmelden
    cy.visit('/login'); // Besuche die Login-Seite
    cy.get('input[type="email"]').type('test@example.com'); // Gib die E-Mail-Adresse ein
    cy.get('input[type="password"]').type('123456'); // Gib das Passwort ein
    cy.get('button[type="submit"]').click(); // Klick auf "Anmelden" Button

    // Warte, bis der Benutzer eingeloggt ist und zur Journalseite geht
    cy.url().should('eq', 'http://localhost:3000/', { timeout: 10000 });
    cy.visit('/journal');

    // Überprüfe, ob der Journaleintrag sichtbar ist
    cy.contains('Dies ist mein erster Journaleintrag.').should('be.visible');

    // Klicke auf den Löschen-Button, der den Text "Löschen" enthält
    cy.contains('Löschen').click(); // Klicke auf den "Löschen"-Button

    // Überprüfe, ob der Journaleintrag gelöscht wurde
    cy.contains('Dies ist mein erster Journaleintrag.').should('not.exist'); // Stelle sicher, dass der Text nicht mehr existiert
  });
});
