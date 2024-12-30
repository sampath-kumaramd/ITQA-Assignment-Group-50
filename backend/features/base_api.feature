Feature: Testing the Base API for Unauthorized Access

  Scenario: Calling the base API without authorization should return 401
    Given the server is running
    When I send a request to the base API without authentication
    Then the response status should be 401
