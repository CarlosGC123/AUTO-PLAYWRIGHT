@shopping
Feature: Shopping Cart Management

  As a Sauce Demo customer
  I want to be able to add products to my cart
  So that I can track items I wish to purchase

  Background:
    Given I am logged in as "standard_user"

  # ─── Acceptance Criterion 3 ──────────────────────────────────────────────────
  Scenario: Add a product to the cart from the products page
    When I add the product "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1" item(s)

  # ─── Acceptance Criterion 4 ──────────────────────────────────────────────────
  Scenario: View the added products in the shopping cart
    When I add the product "Sauce Labs Backpack" to the cart
    And I navigate to the shopping cart
    Then I should see "Sauce Labs Backpack" in the cart
