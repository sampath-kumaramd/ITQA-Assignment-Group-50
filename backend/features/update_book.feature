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
