@login
Feature: User Authentication

  As a Sauce Demo customer
  I want to be able to log in to the application
  So that I can access the product catalogue

  # ─── Acceptance Criterion 1 ──────────────────────────────────────────────────
  Scenario: Successful login with a standard user
    Given I am on the Sauce Demo login page
    When I log in with username "standard_user" and valid password
    Then I should see the products page

  # ─── Acceptance Criterion 2 (locked account) ─────────────────────────────────
  Scenario: Locked-out user cannot log in
    Given I am on the Sauce Demo login page
    When I log in with username "locked_out_user" and valid password
    Then I should see an error message "Epic sadface: Sorry, this user has been locked out."

  # ─── Acceptance Criterion 2 (wrong credentials) ──────────────────────────────
  Scenario: Login attempt with invalid credentials shows an error
    Given I am on the Sauce Demo login page
    When I log in with username "invalid_user" and password "wrong_password"
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"
