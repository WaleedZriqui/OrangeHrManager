
import addEmployee from "../../support/page-objects/addEmployee"
import LoginPage from "../../support/page-objects/LoginPage"

const loginObj:LoginPage = new LoginPage();
const addEmpl:addEmployee = new addEmployee();
var emplID: String;
describe(['my-feature'], 'Employee Functionality', () => { 

   
    beforeEach(function()
    {
        cy.visit('/web/index.php/auth/login');
        loginObj.login('Admin', 'admin123')
    })

    it(['my-feature'], 'Add new employee via UI',() => {
        addEmpl.addNewEmployee("FirstName","secondName","lastName", "tss432g", "mypasss21");
    });
})