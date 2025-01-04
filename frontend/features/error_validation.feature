@validation
Feature: Error Validation

  Background:
    Given I am logged in as "problem_user"

  Scenario: Validate checkout information fields
    Given I have items in cart
    When I proceed to checkout
    And I click Continue without filling any information
    Then I should see error message "Error: First Name is required"
    
    When I fill in only the first name
    And I click Continue
    Then I should see error message "Error: Last Name is required"
    
    When I fill in first and last name
    And I click Continue
    Then I should see error message "Error: Postal Code is required"

  Scenario: Validate maximum length of input fields
    Given I am on the checkout information page
    When I enter a string of 256 characters in the first name field
    Then the field should only accept the first 256 characters 

  Scenario: Validate postal code format
    Given I am on the checkout information page
    When I fill in first and last name
    When I enter "12345" in the postal code field
    Then I should not see any error messages

  Scenario: Validate form retains valid data after error
    Given I am on the checkout information page
    When I fill in first name "John"
    And I fill in last name "Doe"
    And I click Continue
    Then I should see error message "Error: Postal Code is required"
    And the first name field should contain "John"
    And the last name field should contain "Doe" 