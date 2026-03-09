const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Adjust if needed
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

