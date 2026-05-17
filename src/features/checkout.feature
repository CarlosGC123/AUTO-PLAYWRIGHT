@checkout
Feature: Complete Purchase Flow

  As a Sauce Demo customer
  I want to complete a purchase from start to finish
  So that I can acquire the products I need

  Background:
    Given I am logged in as "standard_user"
    And I have added "Sauce Labs Backpack" to the cart
    And I navigate to the shopping cart

  # ─── Acceptance Criterion 5 ──────────────────────────────────────────────────
  Scenario: Successfully complete the full checkout process
    When I proceed to checkout
    And I enter my information with first name "John", last name "Doe" and postal code "12345"
    And I continue to the order summary
    And I finish the order
    Then I should see the order confirmation "Thank you for your order!"
