Feature: Get All Books

  Scenario Outline: Retrieve all books successfully
    Given the server is running
    And I am authenticated as "<role>"
    When I send a GET request to "/api/books"
    Then the response status should be 200
    And the response should contain a list of books

  Examples:
    | role  |
    | admin |
    | user  |