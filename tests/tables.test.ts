import test, { expect } from "@playwright/test";

test.describe("Equipment Table", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("/api/test");

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

  test("filter by department shows correct results", async ({ page }) => {
    const departmentFilter = page.getByRole("combobox").nth(0);

    // Filter to Machining department
    await departmentFilter.selectOption("Machining");

    // Target equipment table specifically
    const equipmentTable = page.locator("table").first();
    const rows = equipmentTable.locator("tbody tr:not(.no-results)");

    // Verify results
    await expect(rows).toHaveCount(2);
    await expect(rows.first().locator("td").nth(4)).toHaveText("Machining");
    await expect(rows.last().locator("td").nth(4)).toHaveText("Machining");
  });

  // test("filter by status shows correct results", async ({ page }) => {
  //   const statusFilter = page.getByRole("combobox").nth(1);

  //   // Filter to Maintenance status
  //   await statusFilter.selectOption("Maintenance");

  //   const equipmentTable = page.locator("table").first();
  //   const statusCells = equipmentTable.locator("tbody td:nth-child(6)"); // Status column

  //   // Verify all visible rows have correct status
  //   await expect(statusCells).toHaveCount(1);
  //   await expect(statusCells.first()).toHaveText("Maintenance");
  // });

  // test("combined department and status filter", async ({ page }) => {
  //   // Set both filters
  //   await page.getByRole("combobox").nth(0).selectOption("Machining");
  //   await page.getByRole("combobox").nth(1).selectOption("Down");

  //   const equipmentTable = page.locator("table").first();
  //   const rows = equipmentTable.locator("tbody tr:not(.no-results)");

  //   // Verify intersection filter
  //   await expect(rows).toHaveCount(1);
  //   await expect(rows.locator("td").nth(4)).toHaveText("Machining");
  //   await expect(rows.locator("td").nth(5)).toHaveText("Down");
  // });

  // test("clear filters shows all results", async ({ page }) => {
  //   // Apply filters first
  //   await page.getByRole("combobox").nth(0).selectOption("Assembly");
  //   await page.getByRole("combobox").nth(1).selectOption("Operational");

  //   // Clear filters
  //   await page.getByRole("combobox").nth(0).selectOption("");
  //   await page.getByRole("combobox").nth(1).selectOption("");

  //   const equipmentTable = page.locator("table").first();
  //   await expect(
  //     equipmentTable.locator("tbody tr:not(.no-results)")
  //   ).toHaveCount(4);
  // });

  // test("no results state appears correctly", async ({ page }) => {
  //   // Set impossible combination
  //   await page.getByRole("combobox").nth(0).selectOption("Shipping");
  //   await page.getByRole("combobox").nth(1).selectOption("Operational");

  //   const equipmentTable = page.locator("table").first();
  //   await expect(equipmentTable.getByText("No results.")).toBeVisible();
  //   await expect(
  //     equipmentTable.locator("tbody tr:not(.no-results)")
  //   ).toHaveCount(0);
  // });

  // test("filters work with search input", async ({ page }) => {
  //   // Combine text search with filters
  //   await page.getByPlaceholder("Search equipment...").fill("Press Machine");
  //   await page.getByRole("combobox").nth(0).selectOption("Machining");

  //   const equipmentTable = page.locator("table").first();
  //   const rows = equipmentTable.locator("tbody tr:not(.no-results)");

  //   await expect(rows).toHaveCount(1);
  //   await expect(rows.locator("td").nth(2)).toHaveText("Press Machine");
  // });
});
