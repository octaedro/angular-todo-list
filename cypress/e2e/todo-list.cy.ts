describe('Todo List', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4201');
    // Wait for the app to be fully loaded
    cy.get('app-todo-list').should('be.visible');
  });

  it('should add a new todo task', () => {
    const taskText = 'New test task';

    // Type in the input field
    cy.get('input[placeholder="Add a new todo..."]')
      .type(taskText)
      .should('have.value', taskText);

    // Click the add button
    cy.get('button[aria-label="Add todo"]').click();

    // Verify the task was added
    cy.get('app-todo-item')
      .should('have.length', 1)
      .and('contain', taskText);
  });

  it('should not add empty tasks', () => {
    // Try to add an empty task
    cy.get('button[aria-label="Add todo"]').click();

    // Verify no tasks were added
    cy.get('app-todo-item').should('not.exist');
  });

  it('should toggle task completion', () => {
    // Add a task first
    const taskText = 'Task to toggle';
    cy.get('input[placeholder="Add a new todo..."]').type(taskText);
    cy.get('button[aria-label="Add todo"]').click();

    // Toggle the task by clicking the checkbox
    cy.get('app-todo-item').first()
      .find('input[type="checkbox"]')
      .click();

    // Verify the task is completed by checking the checkbox state
    cy.get('app-todo-item').first()
      .find('input[type="checkbox"]')
      .should('be.checked');
  });

  it('should delete a task', () => {
    // Add a task first
    const taskText = 'Task to delete';
    cy.get('input[placeholder="Add a new todo..."]').type(taskText);
    cy.get('button[aria-label="Add todo"]').click();

    // Click the delete button
    cy.get('app-todo-item').first()
      .find('button.delete-btn')
      .click();

    // Confirm deletion in the dialog
    cy.get('mat-dialog-container')
      .find('button').contains('Delete')
      .click();

    // Verify the task was deleted
    cy.get('app-todo-item').should('not.exist');
  });
});
