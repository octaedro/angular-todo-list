# Fernando Marichal - TodoList

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Angular CLI (v10.2.4)

## Features

- Add new tasks
- Mark tasks as completed
- Delete tasks (with confirmation dialog)
- Filter tasks by status (All, Completed, Incomplete)
- **Task list persistence**: All tasks and filter status are automatically saved in the browser's local storage, ensuring your data remains available even after page reloads

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## GitHub Actions

Due to the use of Node.js 14, Husky (which requires Node 18+) is not available for local pre-push enforcement.  
To ensure code quality, this project uses a GitHub Actions workflow that runs tests on every push and pull request.  
Merging into the `main` branch is only allowed if all tests pass.

## Accessibility

The application implements several accessibility considerations:

- **Semantic HTML**: Proper use of roles (`role="list"`, `role="listitem"`) and ARIA attributes
- **Keyboard Navigation**: Visible focus states and proper tab order
- **Screen Reader Support**:
  - Hidden labels for screen readers (`.sr-only` class)
  - Descriptive `aria-label` attributes
  - Proper button and input labeling
- **Visual Accessibility**:
  - Sufficient color contrast
  - Clear focus indicators
  - Responsive hover states
- **Form Controls**:
  - Properly associated labels with inputs
  - Descriptive error messages
  - Clear action buttons

### End-to-End Tests

We use Cypress for end-to-end testing instead of Protractor for several reasons:

1. **Modern Tooling**: Cypress is actively maintained and provides a better developer experience
2. **Better Chrome Support**: Cypress has better compatibility with recent Chrome versions
3. **Visual Interface**: Cypress provides a visual interface for running and debugging tests
4. **Simpler Syntax**: Tests are easier to write and maintain with Cypress
5. **Better Async Handling**: Cypress handles asynchronous operations more elegantly
6. **Automatic Screenshots**: Cypress automatically takes screenshots on test failures

To run the e2e tests:

```bash
npm run e2e        # Opens Cypress in interactive mode
npm run e2e:headless  # Runs tests in headless mode
```
