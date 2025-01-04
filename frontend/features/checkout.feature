@checkout
Feature: Checkout functionality
  As a user
  I want to be able to checkout items
  So that I can complete my purchase

Scenario: Successfully checkout items from cart
    Given I am logged in to Swag Labs
    And I have items in my cart
    And I am on the cart page
    When I click on the "Checkout" button
    Then I should be redirected to the checkout information page

Scenario: Navigate from checkout information to overview page
    Given I am logged in to Swag Labs
    And I have items in my cart
    And I have clicked on the checkout button
    And I am on the checkout information page
    When I fill in the checkout information
      | firstName | lastName | postalCode |
      | John      | Doe      | 12345      |
    And I click on the "Continue" button
    Then I should be redirected to the checkout overview page

Scenario: Complete checkout
    Given I am logged in to Swag Labs
    And I have items in my cart
    And I have clicked on the checkout button
    And I have filled in the checkout information
      | firstName | lastName | postalCode |
      | John      | Doe      | 12345      |
    And I have clicked on the continue button
    And I am on the overview page
    When I click on the "Finish" button
    Then I should be redirected to the complete page  

Scenario: Return to products page using Continue Shopping button
    Given I am logged in to Swag Labs
    And I am on the cart page
    When I click on the "Continue Shopping" button
    Then I should be redirected to the products page 

