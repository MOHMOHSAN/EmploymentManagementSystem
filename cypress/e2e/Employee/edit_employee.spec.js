describe("Edit Employee Form with dummy data", () => {
    const employeeData = {
        "id": "2",
        "first_name": "Daniella",
        "last_name": "Mackenzie",
        "email": "Daniella@example.com",
        "phone": 97243421,
        "gender": "Male",
        "dob": "1992-04-24",
        "joined_date": "2025-04-21"
    };

    beforeEach(() => {
        // Navigate to Add Employee Form
        cy.visit("/employee/add");

        // Fill the form with hardcoded employee data
        cy.get('[data-cy="first_name"]').clear().type(employeeData.first_name);
        cy.get('[data-cy="last_name"]').clear().type(employeeData.last_name);
        cy.get('[data-cy="email"]').clear().type(employeeData.email);
        cy.get('[data-cy="phone"]').clear().type(employeeData.phone);

        // For Radio button
        cy.get('input[type="radio"][value="Male"]').check({ force: true });


        // For AntD DatePicker
        cy.get('[data-cy="dob"]')
            .invoke('val', employeeData.dob).trigger('change');
        
        cy.get('[data-cy="joined_date"]')
            .invoke('val', employeeData.joined_date).trigger('change');
    });


    it("Loading Existing data successfully", () => {
        cy.get('[data-cy="first_name"]').should("have.value", employeeData.first_name);
        cy.get('[data-cy="last_name"]').should("have.value", employeeData.last_name);
        cy.get('[data-cy="email"]').should("have.value", employeeData.email);
        cy.get('[data-cy="phone"]').should("have.value", employeeData.phone);
        cy.get('[data-cy="gender-Male"]').should("be.checked");
        cy.get('[data-cy="gender-Female"]').should("not.be.checked");
        cy.get('[data-cy="dob"]').should('have.value', employeeData.dob);
        cy.get('[data-cy="joined_date"]').should('have.value', employeeData.joined_date);
    });


});
