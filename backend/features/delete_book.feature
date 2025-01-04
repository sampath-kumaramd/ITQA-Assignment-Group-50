Feature: Delete Book

  Scenario: Delete an existing book successfully
    Given the server is running
    And I am authenticated as "admin"
    And a book with ID 1 exists
    When I send a DELETE request to "/api/books/1"
    Then the response status should be 200

  Scenario: Attempt to delete a non-existent book
    Given the server is running
    And I am authenticated as "admin"
    When I send a DELETE request to "/api/books/999"
    Then the response status should be 404
    
  Scenario: Attempt to delete a book with user
    Given the server is running
    And I am authenticated as "user"
    When I send a DELETE request to "/api/books/2"
    Then the response status should be 401

  Scenario: Attempt to delete a book without authentication
    Given the server is running
    When I send a DELETE request to "/api/books/2" without authentication
    Then the response status should be 401
    