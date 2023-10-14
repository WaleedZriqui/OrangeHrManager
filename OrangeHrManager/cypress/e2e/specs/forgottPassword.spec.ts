import LoginPage from "../../support/page-objects/LoginPage"

const loginObj:LoginPage = new LoginPage();

describe('Forgott Password Page', () => { 

   
    beforeEach(function()
    {
        cy.visit('/web/index.php/auth/login');
    })

    it('ForgottPassword',() => { 
        loginObj.forgottPassword('Admin')
    });
})