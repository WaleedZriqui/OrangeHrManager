import { createUserPayload } from '../../../support/interfaces';
import {faker} from '@faker-js/faker';

describe('Login to the Home page', () => {


    it('Create User - v1', () => {

        cy.api(
            {
                method: 'POST',
                url: 'https://conduit.productionready.io/api/users',
                body:
                {
                    user:{
                    username: faker.internet.userName(),
                    email: faker.internet.email(),
                    password:"232fa"
                }
                }
            }
        ).then( (response) => {
            expect(response.status).to.equal(201);
        })

    }); // it1

    it('Create User - v2', () => {

        cy.postMakeAPICall(createUserPayload);
        

    }); // it2
}) // end describe

