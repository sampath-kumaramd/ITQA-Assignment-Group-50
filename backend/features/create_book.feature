Feature: Create Book

  Scenario Outline: Create a new book successfully without ID
    Given the server is running
    And I am authenticated as "<role>"
    When I create a new book with following details:
      | title            | author           |
      | New Book <role>  | Author <role>    |
    Then the response status should be 201

  Examples:
    | role  |
    | admin |
    | user  |

  Scenario: Create a new book successfully with ID
    Given the server is running
    And I am authenticated as "admin"
    When I create a new book with following details:
      | id | title            | author           |
      | 3  | New Book with ID  | Author with ID   |
    Then the response status should be 201

  Scenario: Attempt to create a book without authentication
    Given the server is running
    When I create a new book with following details:
      | title | author |
      | Book without Authentication      | Author without Authentication   |
    Then the response status should be 401
    
  Scenario: Attempt to create a book with invalid data
    Given the server is running
    And I am authenticated as "admin"
    When I create a new book with following details:
      | title | author |
      |       |        |
    Then the response status should be 400
    
  Scenario: Attempt to create a book with invalid data types
    Given the server is running
    And I am authenticated as "admin"
    When I create a new book with following details:
      | id  | title | author |
      | id  | new Title    | new Author     |
    Then the response status should be 400
    
