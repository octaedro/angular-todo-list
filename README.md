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

## Development

- **Dev server**: Run `ng serve` and navigate to `http://localhost:4200/`
- **Build**: Run `ng build` (artifacts in `dist/` directory, use `--prod` for production)
- **Unit tests**: Run `ng test` to execute tests via [Karma](https://karma-runner.github.io)

## GitHub Actions

- Due to the use of Node.js 14, Husky (which requires Node 18+) is not available for local pre-push enforcement
- To ensure code quality, this project uses a GitHub Actions workflow that runs tests on every push and pull request
- Merging into the `main` branch is only allowed if all tests pass

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

# Improvements

### Development Workflow

- **Pre-commit Hooks**: Implement Husky to run tests and linting before each commit, ensuring code quality.
- **Pull Request Documentation**: Enhance PR descriptions with detailed information about changes, testing performed, and impact analysis.
- **Component Documentation**: Add Storybook to document components, their variations, and usage examples.

### Testing Strategy

- **E2E Testing**: Expand E2E test coverage to include all critical and important user flows.
- **Continuous Integration**: Implement GitHub Actions to run E2E tests daily, ensuring system robustness.
- **Responsive Testing**: Add device testing across multiple screen sizes and browsers to ensure consistent user experience.

### Code Quality

- **Type Safety**: Enhance TypeScript configurations for stricter type checking.
- **Performance Monitoring**: Add performance metrics and monitoring for critical operations.
- **Accessibility**: Implement automated accessibility testing to ensure WCAG compliance.

### User Experience

- **Offline Support**: Add service worker for offline functionality.
- **Internationalization**: Add support for multiple languages.

## Security Considerations

These vulnerabilities exist in **transitive dependencies**. Even though they don't appear in the `package.json`, they're still part of the application's dependency tree as shown in `package-lock.json`. If exploited, these vulnerabilities could potentially lead to security issues like code execution, data exposure, or application compromise.

### Known Vulnerabilities

The following dependencies have been identified as having security vulnerabilities:

| Dependency             | Severity | Location          | Status         |
| ---------------------- | -------- | ----------------- | -------------- |
| loader-utils           | Critical | package-lock.json | Pending Update |
| rollup                 | High     | package-lock.json | Pending Update |
| braces                 | High     | package-lock.json | Pending Update |
| ip                     | High     | package-lock.json | Pending Update |
| webpack-dev-middleware | High     | package-lock.json | Pending Update |
| node-forge             | High     | package-lock.json | Pending Update |
