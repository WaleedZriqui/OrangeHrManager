import { Dictionary } from "cypress/types/lodash";

//type ElementMap = { [key: string]: () => void };

class EmployeeTable
{
    elements={
    
        MainMenuItems: () => cy.get('.oxd-sidepanel-body'),
        AddEmp: () => cy.get('.oxd-button--secondary'),
        EmployeeInputName: () => cy.get('.--name-grouped-field'),
        saveNewEmp: () => cy.get('button[type="submit"]'),
        detailsToggBtn: () => cy.get('.oxd-switch-input'),
        EId :()=> cy.get(':nth-child(2) > .oxd-input'),
        userName: () => cy.get(':nth-child(4) > .oxd-grid-2 > :nth-child(1) > .oxd-input-group > :nth-child(2)'),
        password: () => cy.get('input[type="password"]'),
        EmployeeName: ()=> cy.get('div.oxd-grid-item:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > input:nth-child(2)'),
        SupervisorName: ()=> cy.get('div.oxd-grid-item:nth-child(5) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)'),

    }
    
    checkSearch(arr:keyVal[])
    {

        for(let i=0;i < arr.length; i++)
        {
            if(arr[i].key == "Id")
            {
                this.elements.EId().type(arr[i].value)
            }
             if(arr[i].key == "EmployeeName")
            {
                this.elements.EmployeeName().type(arr[i].value)
            }
             if(arr[i].key == "SupervisorName")
            {
                this.elements.SupervisorName().type(arr[i].value)
            }
        }
    }

    goToPIM()
    {
        this.elements.MainMenuItems().contains('PIM').click();
    }

    checkSearchV2(searchDict:Dictionary)
    {

    const elementSelectors: { [key: string]: () => void } = {
        "Id": () => this.elements.EId().type(searchDict["Id"]),
        "EmployeeName": () => this.elements.EmployeeName().type(searchDict["EmployeeName"]),
        "SupervisorName": () => this.elements.SupervisorName().type(searchDict["SupervisorName"])
    };

    for (const key in searchDict)
    {
        if (elementSelectors.hasOwnProperty(key))
        {
            elementSelectors[key]();
        }
    }
  }
}

export default EmployeeTable;