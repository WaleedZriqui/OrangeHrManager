
import LoginPage from "../../support/page-objects/LoginPage"
import EmployeeTable from "../../support/page-objects/EmployeeTable"

const loginObj:LoginPage = new LoginPage();
const employeeTable:EmployeeTable = new EmployeeTable();

describe('Employee Functionality', () => { 

   
    beforeEach(function()
    {
        cy.visit('/web/index.php/auth/login');
        loginObj.login('Admin', 'admin123');
        employeeTable.goToPIM()
    })
        

    it('Search for employee',() => {
        employeeTable.checkSearch(
            [{key:"Id", value:"0066"},
             {key:"EmployeeName", value:"AnyBody"},
             {key: "SupervisorName", value:"AnySuper"}
            ]
        );
    });

    it('Search for employee v2',() => {
        employeeTable.checkSearchV2(
            {"Id":"0066",
             "EmployeeName": "AnyBody",
             "SupervisorName":"AnySuper"
            }
            
        );
    });
})