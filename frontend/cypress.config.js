const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Stelle sicher, dass dies die korrekte URL für dein Projekt ist
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
