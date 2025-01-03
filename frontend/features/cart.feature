@cart
Feature: Shopping Cart Functionality

  Background:
    Given I am logged in as "problem_user"
    And I am on the inventory page

  Scenario: View empty cart
    When I click on the shopping cart icon
    Then I should see an empty cart
    And I should see the "Continue Shopping" button

  Scenario: Add single item to cart
    When I add "Sauce Labs Backpack" to cart
    And I click on the shopping cart icon
    Then I should see "Sauce Labs Backpack" in the cart
    And I should see the correct price
    And I should see the "Remove" button

  Scenario: Add multiple items to cart
    When I add "Sauce Labs Backpack" to cart
    And I add "Sauce Labs Bike Light" to cart
    And I click on the shopping cart icon
    Then I should see 2 items in the cart
    And I should see the correct total price

  Scenario: Remove item from cart
    Given I have added "Sauce Labs Backpack" to cart
    And I am on the cart page
    When I click the "Remove" button
    Then the item should be removed from cart

  Scenario: Continue shopping
    Given I am on the cart page
    When I click the cart button "Continue Shopping"
    Then I should return to the inventory page

  Scenario: Proceed to checkout
    Given I have items in cart
    And I am on the cart page
    When I click "Checkout"
    Then I should be taken to the checkout information page 