# ITQA-Assignment-Group-50

## Project Overview

This project implements a comprehensive test automation framework for both frontend and backend applications. It uses Cucumber for behavior-driven development (BDD) and Playwright for browser and API testing.

## Repository Structure

The repository is organized into two main directories:

- **Frontend**: Contains tests for a web application (Swag Labs)
- **Backend**: Contains tests for a RESTful API (Book management service)

## Technologies Used

- **Cucumber.js**: For writing BDD-style test scenarios
- **Playwright**: For browser automation and API testing
- **Allure Reports**: For test reporting and visualization
- **GitHub Actions**: For CI/CD pipeline

## Frontend Testing

The frontend tests cover the Swag Labs e-commerce demo site with features including:

- Login functionality
- Product inventory browsing
- Shopping cart operations
- Checkout process
- Navigation and menu functionality
- Product details
- Error validation

### Key Features Tested

- User authentication with different user types
- Product sorting and filtering
- Adding/removing items from cart
- Checkout process validation
- Form validation
- UI element verification

## Backend Testing

The backend tests cover a RESTful API for book management with features including:

- Authentication
- CRUD operations for books (Create, Read, Update, Delete)
- Error handling and validation

### API Endpoints Tested

- GET /api/books - Retrieve all books
- GET /api/books/{id} - Retrieve a specific book
- POST /api/books - Create a new book
- PUT /api/books/{id} - Update an existing book
- DELETE /api/books/{id} - Delete a book

## CI/CD Pipeline

The project includes a GitHub Actions workflow that:

1. Runs both frontend and backend tests
2. Generates Allure reports
3. Publishes test results to GitHub Pages

## Running Tests Locally

### Frontend Tests

```bash
cd frontend
npm ci
npx playwright install --with-deps
npm test
```

### Backend Tests

```bash
cd backend
npm ci
npm test
```

## Test Reports

Test reports are generated using Allure and can be viewed after running the tests:

```bash
# To generate and open the report
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

## Contributors

- Group 50 members

## License

ISC
