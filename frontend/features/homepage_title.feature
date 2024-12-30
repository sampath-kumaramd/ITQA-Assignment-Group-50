Feature: Test website frontend functionality

  Scenario: Load the homepage and check title
    Given I navigate to the homepage
    Then I should see the page title as "Swag Labs"
    