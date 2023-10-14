class addEmployee
{
    elements={
    
        MainMenuItems: () => cy.get('.oxd-sidepanel-body'),
        AddEmp: () => cy.get('.oxd-button--secondary'),
        EmployeeInputName: () => cy.get('.--name-grouped-field'),
        saveNewEmp: () => cy.get('button[type="submit"]'),
        detailsToggBtn: () => cy.get('.oxd-switch-input'),

        userName: () => cy.get(':nth-child(4) > .oxd-grid-2 > :nth-child(1) > .oxd-input-group > :nth-child(2)'),
        password: () => cy.get('input[type="password"]'),
    }
    

    addNewEmployee(firstName:string, MiddleName:string, LastName:string, userName:string, pwd:string){
     this.elements.MainMenuItems().contains('PIM').click();
     this.elements.AddEmp().eq(1).click()
     this.elements.EmployeeInputName().children().eq(0).type(firstName)
     this.elements.EmployeeInputName().children().eq(1).type(MiddleName)
     this.elements.EmployeeInputName().children().eq(2).type(LastName)
     this.elements.detailsToggBtn().click();

     this.elements.userName().type(userName);
     this.elements.password().eq(0).type(pwd);
     this.elements.password().eq(1).type(pwd);
     // TODO: enable when delete user is implemented, else "Username already exists" !!
     // this.elements.saveNewEmp().click();

     //cy.log(cy.get('.--strong').text())//.should('eq', firstName)
    }

}
export default addEmployee;