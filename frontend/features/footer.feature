 @footer
 Feature: Footer Functionality

  Background:
    Given I am logged in as "problem_user"
    And I am on the inventory page

  Scenario: Verify social media links
    Then I should see Twitter link in the footer
    And I should see Facebook link in the footer
    And I should see LinkedIn link in the footer

  Scenario: Verify copyright text
    Then I should see the copyright text in the footer
    And the copyright year should be current

  Scenario: Social media links should open in new tab
    When I click on the Twitter link
    Then it should open in a new tab
    When I click on the Facebook link
    Then it should open in a new tab
    When I click on the LinkedIn link
    Then it should open in a new tab