@productcard_img
Feature: Test website frontend functionality

  Scenario: Display different product images in the product cart
    Given I am logged in to the website
    And I navigate to the products page
    Then each product in the cart should display a different image

  Scenario: Check the required field in checkout stage
    Given I am logged in to the website
    And I navigate to the products page
    And Click the add to cart button
    And I click the checkout button and direct to the checkout page
    Then I click the Continue button and see an error message

  Scenario: Not working some add to cart button
    Given I am logged in to the website
    And I navigate to the products page
    And I click the add to cart button in product card
    Then Some add to cart buttons are not working

