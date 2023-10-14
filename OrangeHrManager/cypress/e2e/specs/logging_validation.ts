import LoginPage from "../../support/page-objects/LoginPage"
import { BASE_URL } from "../../support/constants";

const loginObj: LoginPage = new LoginPage();

describe('Login to the Home page', () => {

    before(function () {
        cy.fixture('logging_data').as('logging_data');
    })

    beforeEach(function () {
        cy.visit('/web/index.php/auth/login');

    })
    it('loginWithValidUserAndPassword', () => {

        cy.get('@logging_data').then((data: any) => {
            loginObj.login(data.valid_username, data.invalid_pwd);
        });
        
    });

        const valid_loggin_dict = {
            //tc_name: [username, password]
            "valid_username_valid_password": ["admin", "admin123"],
        };
        for (const tc in valid_loggin_dict)
        {
            
            it(`Valid Logging TC: ${tc}`, () => {
                loginObj.login_check_valid_login(valid_loggin_dict[tc][0], valid_loggin_dict[tc][1]);
            })
        }
    

        const invalid_loggin_dict = {
            //tc_name: [username, password]
            "valid_username_invalid_password": ["admin", "123"],
            "invalid_username_valid_password": ["12ya", "admin123"],
            "invalid_username_invalid_password": ["addasmin", "admdsain123"]
        };
        for (const tc in invalid_loggin_dict)
        {
            
            it(`InValid Logging TC: ${tc}`, () => {
                loginObj.login_check_invalid_login(invalid_loggin_dict[tc][0], invalid_loggin_dict[tc][1]);
            })
        }


        it('Invalid logging, USER is empty -> REQUIRED', () => {
            loginObj.login_check_empty_username(" ", "notEmptyPassword");
        })

        it('Invalid logging, PWD is empty -> REQUIRED', () => {
            loginObj.login_check_empty_password('NotEmptyUser','');
        })


        it('Invalid logging, USER and PWD are empty -> REQUIRED x2', () => {
            loginObj.login_check_empty_user_and_password('','');
        })
})