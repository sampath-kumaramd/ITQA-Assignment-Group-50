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
