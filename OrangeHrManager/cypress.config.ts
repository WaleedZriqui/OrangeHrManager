import { defineConfig } from "cypress";
// const allureWriter = require('@shelex/cypress-allure-plugin/writer');
import { tagify } from 'cypress-tags';

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
    setupNodeEvents(on, config) {
      // allureWriter(on, config);
      on('file:preprocessor', tagify(config));
      return config;
    },
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    env: {
      allure: true,
      allureResultsPath: "./allure-results",
      download_dir: './cypress/downloads',
      reporter: "mochawesome",
      reporterOptions: {
        reportDir: "cypress/reports/mochawesome-report",
        overwrite: true,
        html: true,
        json: true,
      },
      snapshotOnly: true
    },
  },

  // import allureWriter from "@shelex/cypress-allure-plugin/writer";

});
