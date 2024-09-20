const { defineConfig } = require("cypress");

module.exports = defineConfig({
  fileServerFolder: 'cypress/fixtures', // Configura a pasta de arquivos que podem ser servidos
  env:{
    pack: '1',
    validValues: ['1', '2', '3'],
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
