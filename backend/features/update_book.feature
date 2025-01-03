Feature: Update Book

  Scenario: Update an existing book successfully with admin
    Given the server is running
    And I am authenticated as "admin"
    And a book with ID 1 exists
    When I update the book with following details:
      | id | title                  | author                 |
      | 1  | Updated Book admin    | Updated Author admin  |
    Then the response status should be 200

  Scenario: Attempt to update book with user
    Given the server is running
    And I am authenticated as "user"
    And a book with ID 1 exists
    When I update the book with following details:
      | id | title                  | author                 |
      | 1  | Updated Book user    | Updated Author user  |
    Then the response status should be 401

  Scenario: Attempt to update book without ID
    Given the server is running
    And I am authenticated as "admin"
    When I update the book with following details:
      | title           | author          |
      | Updated Title   | Updated Author  |
    Then the response status should be 400

  Scenario: Attempt to update book without authentication
    Given the server is running
    And a book with ID 1 exists
    When I update the book with following details:
      | id | title           | author          |
      | 1  | Updated Title   | Updated Author  |
    Then the response status should be 401

  Scenario: Attempt to update book with empty title field
    Given the server is running
    And I am authenticated as "admin"
    And a book with ID 1 exists
    When I update the book with following details:
      | id | title | author |
      | 1  |       | Testing Author        |
    Then the response status should be 400

  Scenario: Attempt to update book with empty author field
    Given the server is running
    And I am authenticated as "admin"
    And a book with ID 1 exists
    When I update the book with following details:
      | id | title | author |
      | 1  | Testing Title |       |
    Then the response status should be 400

  Scenario: Attempt to update book with numeric author name
    Given the server is running
    And I am authenticated as "admin"
    And a book with ID 1 exists
    When I update the book with following details:
      | id | title          | author |
      | 1  | Valid Title Updated    | 1234567  |
    Then the response status should be 400

  Scenario: Attempt to update book with wrong key names
    Given the server is running
    And I am authenticated as "admin"
    And a book with ID 1 exists
    When I update the book with following details:
      | id | bookTitle      | bookAuthor |
      | 1  | Updated Book Updated   | John Doe Updated   |
    Then the response status should be 400

  Scenario: Attempt to update book with extra fields
    Given the server is running
    And I am authenticated as "admin"
    And a book with ID 1 exists
    When I update the book with following details:
      | id | title         | author    | publisher | isbn       | year |
      | 1  | Updated Book Updated  | John Doe Updated  | Publisher Updated | 123456789 Updated  | 2024 Updated |
    Then the response status should be 400

  Scenario: Attempt to update non-existent book
    Given the server is running
    And I am authenticated as "admin"
    When I update the book with following details:
      | id   | title         | author        |
      | 999  | Updated Book  | Updated Author|
    Then the response status should be 404

  Scenario: Attempt to update book with invalid ID format
    Given the server is running
    And I am authenticated as "admin"
    When I update the book with following details:
      | id      | title         | author        |
      | abc123  | Updated Book  | Updated Author|
    Then the response status should be 400