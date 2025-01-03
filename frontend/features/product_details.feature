@product_details
Feature: Product Details Functionality

  Background:
    Given I am logged in as "problem_user"
    And I am on the inventory page

  Scenario: View product details
    When I click on product "Sauce Labs Backpack"
    Then I should see the product image
    And I should see the product title
    And I should see the product description
    And I should see the product price

  Scenario: Add to cart from product details
    Given I am viewing product "Sauce Labs Backpack"
    When I click "Add to cart"
    Then the cart badge should show "1"
    And the button should change to "Remove"

  Scenario: Remove from cart in product details
    Given I am viewing product "Sauce Labs Backpack"
    And I have added it to cart
    When I click "Remove"
    Then the cart badge should be empty
    And the button should change to "Add to cart"

  Scenario: Back to products from details
    Given I am viewing product details
    When I click "Back to products"
    Then I should return to the inventory page
