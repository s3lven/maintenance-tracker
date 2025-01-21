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

  test("should show validation errors for invalid equipment data", async ({
    page,
  }) => {
    // Submit empty form
    await page.getByRole("button", { name: "Submit" }).nth(0).click();

    // Check for validation errors
    await expect(
      page.getByText("Name must be at least 3 characters")
    ).toBeVisible();
    await expect(page.getByText("Location is required")).toBeVisible();
    await expect(page.getByText("Model is required")).toBeVisible();
    await expect(page.getByText("Serial Number is required")).toBeVisible();
    await expect(page.getByText("Invalid date")).toBeVisible();
  });
});

test.describe("Maintenance Record Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should create new maintenance record", async ({ page }) => {
    // Fill in the maintenance record form
    await page.getByLabel("Equipment").selectOption("Test Equipment");
    // Assuming equipment exists
    await page.getByLabel("Maintenance Date").fill("2023-01-01");
    await page
      .getByTestId("maintenance-record-type")
      .selectOption("Preventive");
    await page.getByLabel("Technician").fill("John Smith");
    await page.getByLabel("Hours Spent").fill("8");
    await page
      .getByLabel("Description")
      .fill("Regular maintenance check performed");
    await page
      .getByTestId("maintenance-record-priority")
      .selectOption("Medium");
    await page
      .getByTestId("maintenance-record-completion-status")
      .selectOption("Complete");

    // Submit the form
    await page.getByRole("button", { name: "Submit" }).nth(1).click();

    // Check for success message
    await expect(page.getByText("Record added successfully!")).toBeVisible();
  });

  test("should validate maintenance hours", async ({ page }) => {
    // Test negative hours
    await page.getByLabel("Hours Spent").fill("-1");
    await page.getByRole("button", { name: "Submit" }).nth(1).click();
    await expect(
      page.getByText("Hours spent must be a positive number")
    ).toBeVisible();

    // Test hours over 24
    await page.getByLabel("Hours Spent").fill("25");
    await page.getByRole("button", { name: "Submit" }).nth(1).click();
    await expect(page.getByText("Cannot exceed 24 hours")).toBeVisible();
  });
});
