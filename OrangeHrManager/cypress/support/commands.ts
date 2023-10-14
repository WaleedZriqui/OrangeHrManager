/// <reference types="cypress" />

import cypress = require("cypress");
import { CreateUserPayload } from "./interfaces";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
declare namespace Cypress {
  interface Chainable<Subject> {
    getByPlaceHolder: typeof getByPlaceHolder;
  }
}
function getByPlaceHolder(placeholderName: string) {
  return cy.get('[placeholder="' + placeholderName + '"]');
}


const makeAPICall = (method, url, body) => {
  const expectedStatusCodes = {
    'POST': 201,
    'GET': 200,
    'DELETE': 204
  };

  cy.api({
    method,
    url,
    body
  }).then((response) => {
    expect(response.status).to.equal(expectedStatusCodes[method]);
  })
}

Cypress.Commands.add('getByPlaceHolder' as any, getByPlaceHolder);
Cypress.Commands.add('makeAPICall' as any, makeAPICall);


Cypress.Commands.add('postMakeAPICall' as any, (createUserPayload: CreateUserPayload) => {
  makeAPICall('POST', 'https://conduit.productionready.io/api/users', createUserPayload)

})
