@inventory
Feature: Inventory Functionality

  Background:
    Given I am logged in as "problem_user"
    And I am on the inventory page

  Scenario: Verify inventory page elements
    Then I should see the shopping cart icon
    And I should see the burger menu
    And I should see the product sort container
    And I should see product items

  Scenario: Sort products by name (A to Z)
    When I click on the sort dropdown
    And I select "Name (A to Z)"
    Then products should be sorted alphabetically ascending

  Scenario: Sort products by name (Z to A)
    When I click on the sort dropdown
    And I select "Name (Z to A)"
    Then products should be sorted alphabetically descending

  Scenario: Sort products by price (low to high)
    When I click on the sort dropdown
    And I select "Price (low to high)"
    Then products should be sorted by price ascending

  Scenario: Sort products by price (high to low)
    When I click on the sort dropdown
    And I select "Price (high to low)"
    Then products should be sorted by price descending

  Scenario: View product details
    When I click on a product name
    Then I should see the product details page

  Scenario: Add product to cart from inventory
    When I click "Add to cart" for "Sauce Labs Backpack"
    Then the cart badge should show "1"
    And the button should change to "Remove"
