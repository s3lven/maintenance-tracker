import { test, expect } from "@playwright/test";

test.describe("Equipment Form", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/test')
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

    // Check for browser-side validation
    await expect(page.getByLabel("Name")).toHaveAttribute('required', '')
    await expect(page.getByLabel("Location")).toHaveAttribute('required', '')
    await expect(page.getByLabel("Department")).toHaveAttribute('required', '')
    await expect(page.getByLabel("Model")).toHaveAttribute('required', '')
    await expect(page.getByLabel("Serial Number")).toHaveAttribute('required', '')
    await expect(page.getByLabel("Install Date")).toHaveAttribute('required', '')
    await expect(page.getByTestId("equipment-status")).toHaveAttribute('required', '')
  });

  test("should keep inputs for invalid equipment data", async ({ page }) => {
    // Fill in the equipment form
    await page.getByLabel("Name").fill("Test Equipment");
    await page.getByLabel("Department").selectOption("Assembly");
    await page.getByLabel("Install Date").fill("2023-01-01");

    // Submit the form
    await page.getByRole("button", { name: "Submit" }).nth(0).click();

    // Check for filled in inputs
    await expect(page.getByLabel("Name")).toHaveValue("Test Equipment");
    await expect(page.getByLabel("Department")).toHaveValue("Assembly");
    await expect(page.getByLabel("Install Date")).toHaveValue("2023-01-01");
  });
});

test.describe("Maintenance Record Form", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/test')
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
    // FIll out the rest of the form
    await page.getByLabel("Equipment").selectOption("Test Equipment");
    // Assuming equipment exists
    await page.getByLabel("Maintenance Date").fill("2023-01-01");
    await page
      .getByTestId("maintenance-record-type")
      .selectOption("Preventive");
    await page.getByLabel("Technician").fill("John Smith");
    await page
      .getByLabel("Description")
      .fill("Regular maintenance check performed");
    await page
      .getByTestId("maintenance-record-priority")
      .selectOption("Medium");
    await page
      .getByTestId("maintenance-record-completion-status")
      .selectOption("Complete");

    await page.getByRole("button", { name: "Submit" }).nth(1).click();

    await expect(
      page.getByText("Hours spent must be a positive number")
    ).toBeVisible();

    // Test hours over 24
    await page.getByLabel("Hours Spent").fill("25");
    await page.getByRole("button", { name: "Submit" }).nth(1).click();
    await expect(page.getByText("Cannot exceed 24 hours")).toBeVisible();
  });

  test("should keep inputs for invalid maintenance record data", async ({ page }) => {
    // Fill in the equipment form
    await page.getByLabel("Equipment").selectOption("Test Equipment");
    // Assuming equipment exists
    await page.getByLabel("Maintenance Date").fill("2023-01-01");
    await page
      .getByTestId("maintenance-record-type")
      .selectOption("Preventive");
    await page.getByLabel("Technician").fill("John Smith");

    // Submit the form
    await page.getByRole("button", { name: "Submit" }).nth(1).click();

    // Check for filled in inputs
    await expect(page.getByLabel("Equipment")).toHaveValue("Test Equipment");
    // Assuming equipment exists
    await expect(page.getByLabel("Maintenance Date")).toHaveValue("2023-01-01");

    await expect(page.getByLabel("Technician")).toHaveValue("John Smith");
  });
});
