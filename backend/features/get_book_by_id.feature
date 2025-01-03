Feature: Get Book by ID

  Scenario Outline: Retrieve a book by ID successfully
    Given the server is running
    And I am authenticated as "<role>"
    And a book with ID 1 exists
    When I send a GET request to "/api/books/1"
    Then the response status should be 200
    And the response should contain the book details

  Examples:
    | role  |
    | admin |
    | user  |

  Scenario: Attempt to retrieve a non-existent book
    Given the server is running
    And I am authenticated as "<role>"
    When I send a GET request to "/api/books/999"
    Then the response status should be 404
    

  Examples:
    | role  |
    | admin |
    | user  |