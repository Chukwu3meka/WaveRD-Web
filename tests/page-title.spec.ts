// @ts-check

import { test, expect } from "@playwright/test";
import pageInfo from "utils/page-info";

test("has title", async ({ page }) => {
  for (const [key, value] of Object.entries(pageInfo)) {
    const { path, title, description, keywords } = value;

    await page.goto(path);
    await expect(page).toHaveURL(path);
    await expect(page).toHaveTitle(title);
  }
});

// test("get started link", async ({ page }) => {
//   await page.goto("/");

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible();
// });
