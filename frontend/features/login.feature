@login
Feature: Login Functionality

  Scenario: Successful login with standard user
    Given I navigate to the homepage
    When I enter "problem_user" as username
    And I enter "secret_sauce" as password
    And I click the login button
    Then I should be redirected to the inventory page

  Scenario: Login with locked out user
    Given I navigate to the homepage
    When I enter "locked_out_user" as username
    And I enter "secret_sauce" as password
    And I click the login button
    Then I should see error message "Epic sadface: Sorry, this user has been locked out."

  Scenario: Login with problem user
    Given I navigate to the homepage
    When I enter "problem_user" as username
    And I enter "secret_sauce" as password
    And I click the login button
    Then I should be redirected to the inventory page

  Scenario: Login with performance glitch user
    Given I navigate to the homepage
    When I enter "performance_glitch_user" as username
    And I enter "secret_sauce" as password
    And I click the login button
    Then I should be redirected to the inventory page within 5 seconds

  Scenario: Login with empty credentials
    Given I navigate to the homepage
    When I click the login button
    Then I should see error message "Epic sadface: Username is required"

  Scenario: Login with empty password
    Given I navigate to the homepage
    When I enter "problem_user" as username
    And I click the login button
    Then I should see error message "Epic sadface: Password is required"

  Scenario: Login with invalid username
    Given I navigate to the homepage
    When I enter "invalid_user" as username
    And I enter "secret_sauce" as password
    And I click the login button
    Then I should see error message "Epic sadface: Username and password do not match any user in this service"

  Scenario: Login with invalid password
    Given I navigate to the homepage
    When I enter "problem_user" as username
    And I enter "wrong_password" as password
    And I click the login button
    Then I should see error message "Epic sadface: Username and password do not match any user in this service"