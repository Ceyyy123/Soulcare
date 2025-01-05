describe('Sign Up Functionality', () => {
  it('should register successfully with valid credentials', () => {
    // Besuche die Registrierungsseite
    cy.visit('/signup'); 
    
    // Gib die E-Mail-Adresse ein
    cy.get('input[type="email"]').type('newuser@test.com');
    
    // Gib das Passwort ein
    cy.get('input[type="password"]').type('password');
    
    // Klicke auf die Registrieren-Schaltfläche
    cy.get('button[type="submit"]').click();
    
    // Überprüfe, ob der Benutzer erfolgreich registriert wurde
    cy.url().should('eq', 'http://localhost:3000/'); // Überprüfe, ob die URL der Registrierungsseite zur erwarteten Seite wechselt
    
    // Überprüfe, ob die Dashboard-Seite oder eine Bestätigungsnachricht angezeigt wird
    cy.contains('Willkommen').should('be.visible'); // Bestätige, dass die Begrüßungsnachricht sichtbar ist
  });
});
