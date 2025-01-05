describe('Journaleintrag erstellen', () => {
  it('should create and save a journal entry', () => {
    // Zuerst anmelden
    cy.visit('/login'); // Besuche die Login-Seite
    cy.get('input[type="email"]').type('test@example.com'); // Gib die E-Mail-Adresse ein
    cy.get('input[type="password"]').type('123456'); // Gib das Passwort ein
    cy.get('button[type="submit"]').click(); // Klick auf "Anmelden" Button
    
    // Warte, bis der Benutzer eingeloggt ist und zur Journalseite geht
    cy.url().should('eq', 'http://localhost:3000/', { timeout: 10000 });  // Überprüfe, ob der Benutzer auf der Journalseite ist
    cy.visit('/journal');

    // Schreibe den Journaleintrag
    const journalText = 'Dies ist mein erster Journaleintrag.'; // Definiere den Text des Journaleintrags
    cy.get('textarea').type(journalText);  // Direkt das erste textarea ansprechen

    // Klicke auf „Speichern“
    cy.get('button').contains('Speichern').click();  // Überprüfe den Button-Text und klicke darauf
    
    // Überprüfe, ob der Journaleintrag gespeichert wurde und auf der Seite erscheint
    cy.contains(journalText).should('be.visible'); // Überprüfe, dass der Text des Journaleintrags angezeigt wird
  });
});
