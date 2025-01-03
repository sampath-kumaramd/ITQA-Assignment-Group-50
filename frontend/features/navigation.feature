@navigation
Feature: Navigation and Menu Functionality

  Background:
    Given I am logged in as "problem_user"

  Scenario: Open burger menu
    When I click the burger menu button
    Then I should see the menu items
    And I should see the close button

  Scenario: Close burger menu
    Given the burger menu is open
    When I click the close button
    Then the menu should be hidden

  Scenario: Navigate to All Items
    Given the burger menu is open
    When I click the menu item "All Items"
    Then I should be on the inventory page

  Scenario: Navigate to About
    Given the burger menu is open
    When I click "About"
    Then I should be redirected to Sauce Labs website

  Scenario: Logout
    Given the burger menu is open
    When I click "Logout"
    Then I should be logged out
    And I should see the login page

  Scenario: Reset App State
    Given I have items in cart
    And the burger menu is open
    When I click "Reset App State"
    Then my cart should be empty
    And all items should be reset to "Add to cart" 