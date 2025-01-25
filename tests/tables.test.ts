import test, { expect } from "@playwright/test";

test.describe("Equipment Table", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("bulk edit controls appear when rows are selected", async ({ page }) => {
    await expect(page.getByTestId("bulkEditStatus")).not.toBeVisible();
    await expect(
      page.getByRole("button", { name: "Confirm Bulk Edit" })
    ).not.toBeVisible();

    const checkboxes = page.locator('input[type="checkbox"]');
    await checkboxes.nth(1).check();
    await checkboxes.nth(2).check();

    // Verify bulk edit controls appear
    await expect(page.getByTestId("bulkEditStatus")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Confirm Bulk Edit" })
    ).toBeVisible();
  });

  test("successful bulk status update", async ({ page }) => {
    // Select rows and open bulk edit
    const checkboxes = page.locator('input[type="checkbox"]');
    await checkboxes.nth(1).check();
    await checkboxes.nth(2).check();

    // Configure Bulk Edit
    const statusSelect = page.getByTestId("bulkEditStatus");
    await statusSelect.selectOption("Down");

    // Handle confirmation dialogs
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });

    // Trigger bulk update
    await page.getByRole("button", { name: "Confirm Bulk Edit" }).click();

    // Verify UI updates
    await expect(statusSelect).not.toBeVisible();
    await expect(checkboxes.nth(1)).not.toBeChecked();
    await expect(checkboxes.nth(2)).not.toBeChecked();

    // Verify status updates in the table
    const firstRowStatus = page.locator("tbody tr:nth-child(1) td").nth(5);
    const secondRowStatus = page.locator("tbody tr:nth-child(2) td").nth(5);

    await expect(firstRowStatus).toHaveText("Down");
    await expect(secondRowStatus).toHaveText("Down");
  });
});
