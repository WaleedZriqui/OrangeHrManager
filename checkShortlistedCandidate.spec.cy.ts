import LoginPage from "../../support/page-objects/LoginPage"
import ChangeStatusForApplicationStage from "../../support/page-objects/changeStatusForApplicationStage"

import { faker } from '@faker-js/faker';

const loginObj: LoginPage = new LoginPage();
const changeStatusForApplicationStage: ChangeStatusForApplicationStage = new ChangeStatusForApplicationStage();

var createdEmpNumber: Number;
var createdEmpName: String;
var createdVacancyId: Number;
var candidateID: Number;

describe('Employee Functionality', () => {

    beforeEach(function () {
        cy.visit('/web/index.php/auth/login');
        loginObj.login('Admin', 'admin123')
    })

    it('Check schedule interview for candidate', () => {
        // create user to assign to the created vacancy later
        cy.api(
            {
                method: 'POST',
                url: '/web/index.php/api/v2/pim/employees',
                body:
                {
                    firstName: faker.person.firstName(),
                    middleName: faker.person.middleName(),
                    lastName: faker.person.lastName(),
                    empPicture: null,
                    employeeId: "555"
                }
            }
        ).then((response) => {
            expect(response).property('status').to.equal(200)
            createdEmpNumber = response.body.data.empNumber;
            createdEmpName = response.body.data.firstName;

            // create vacancy to be assigned to the new candidate
            cy.api({
                method: 'POST',
                url: "/web/index.php/api/v2/recruitment/vacancies",
                body:
                {
                    name: faker.person.firstName() + " Job Name ",
                    jobTitleId: 22, // JobcategoryId
                    employeeId: createdEmpNumber,
                    numOfPositions: null,
                    description: "",
                    status: true,
                    isPublished: true
                }
            })
        }).then((response) => {
            expect(response.status).to.equal(200);
            createdVacancyId = response.body.data.id;
            cy.log(createdVacancyId.toString())
            // API: create candidate <- save:UserID

            cy.api({
                method: 'POST',
                url: "/web/index.php/api/v2/recruitment/candidates",
                body:
                {
                    firstName: faker.person.firstName(),
                    middleName: faker.person.middleName(),
                    lastName: faker.person.lastName(),
                    email: faker.internet.email(),
                    dateOfApplication: "2023-10-14",
                    vacancyId: 8,
                    contactNumber: null,
                    keywords: null,
                    consentToKeepData: false
                }
            }).then((response) => {
                expect(response.status).to.equal(200);
                candidateID = response.body.data.id;
                // API (UserID): per URL change user to shortlisted candidate
                cy.api({
                    method: 'PUT',
                    url: 'web/index.php/api/v2/recruitment/candidates/' + candidateID + '/shortlist',
                    body:
                    {
                        note: null
                    }
                }).then((response) => {
                    expect(response.status).to.equal(200);
                    expect(response.body.data.action.label).to.equal('Shortlisted');

                    // UI: with UserID visit candidate by url -> schedule interview
                    // add employee to add as interviewer
                    cy.visit('web/index.php/recruitment/addCandidate/' + candidateID);
                })
            })



            // UI: fill data (scheduler interview data: Interviewer, date...etc.)
            // assertion interview scheduled
            changeStatusForApplicationStage.scheduleInterview(createdEmpName)
        }
        ) //then create user to assign to the created vacancy later

    }) // end of create vacancy to be assigned to the new candidate

});
