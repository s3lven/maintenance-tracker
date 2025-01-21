import { test, expect } from "@playwright/test";

test.describe("Equipment Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should create new equipment with valid data", async ({ page }) => {
    // Fill in the equipment form
    await page.getByLabel("Name").fill("Test Equipment");
    await page.getByLabel("Location").fill("Test Location");
    await page.getByLabel("Department").selectOption("Assembly");
    await page.getByLabel("Model").fill("TEST-123");
    await page.getByLabel("Serial Number").fill("ABC123");
    await page.getByLabel("Install Date").fill("2023-01-01");
    await page.getByTestId("equipment-status").selectOption("Operational");

    // Submit the form
    await page.getByRole("button", { name: "Submit" }).nth(0).click();

    // Check for success message
    await expect(page.getByText("Equipment added successfully!")).toBeVisible();
  });

  test('should show validation errors for invalid equipment data', async ({ page }) => {
    // Submit empty form
    await page.getByRole('button', { name: 'Submit' }).nth(0).click();

    // Check for validation errors
    await expect(page.getByText('Name must be at least 3 characters')).toBeVisible();
    await expect(page.getByText('Location is required')).toBeVisible();
    await expect(page.getByText('Model is required')).toBeVisible();
    await expect(page.getByText('Serial Number is required')).toBeVisible();
    await expect(page.getByText('Invalid date')).toBeVisible();
  });
});

