class changeStatusForApplicationStage {
    
    candidateProfileElements = {
        nextStatus: () => cy.get('.oxd-button--success'),
        candidateStatus: () => cy.get('.orangehrm-recruitment-status > .oxd-text')
    }

    scheduleInterviewFormElements = {
        scheduleInterviewForm: () => cy.get('.orangehrm-card-container'),
        interviewTitle: () => cy.get(':nth-child(2) > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input'),
        interviewer: () => cy.getByPlaceHolder('Type for hints...'),
        firstItemInInterviewList: () => cy.get('.oxd-autocomplete-option'),
        dateInput: () => cy.get('.oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-icon'),
        saveButton: () => cy.get('.oxd-button--secondary').contains('Save'),
    }

    scheduleInterview(interviwerName) {
        this.candidateProfileElements.nextStatus().contains('Schedule Interview').click();
        this.scheduleInterviewFormElements.scheduleInterviewForm().should('contain', 'Schedule Interview');
        this.scheduleInterviewFormElements.interviewTitle().type("test");
        this.scheduleInterviewFormElements.interviewer().type(interviwerName);
        cy.wait(3000);
        this.scheduleInterviewFormElements.firstItemInInterviewList().eq(0).click();
        this.scheduleInterviewFormElements.dateInput().type("2023-10-20")
        this.scheduleInterviewFormElements.saveButton().click()
        this.candidateProfileElements.candidateStatus().should('have.text', 'Status: Interview Scheduled');
    }

}
export default changeStatusForApplicationStage;