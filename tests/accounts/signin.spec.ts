// @ts-check

import pageInfo from "utils/page-info";
import { ObjectEntries, timeToMS } from "utils/helpers";
import { test, expect } from "@playwright/test";
import { PageInfo } from "interfaces/utils/page-info";

test("Can users signin", async ({ page }) => {
  // await page.goto(pageInfo.signin.path);
  // await page.locator("#password").fill("2018WaveRD");
  // await page.locator("#email").fill("mariam.yamal@waverd.dev");
  // await expect(page.locator("#signin")).toHaveText("Sign in", { timeout: 500 });
  // await page.locator("#signin").click();
  // await page.getByText("Authenticated Successfully").isVisible({ timeout: 500 });
  // polling
  // await expect(page.waitForURL("**")).toBe("jjhgjhgjhg");
  // await expect
  //   .poll(async () => {
  //     return true;
  //   })
  //   .toBe(false);
  //   page.waitForURL("**"), "supposed to be a");
  // await expect(page.waitForURL("**"), "supposed to be a");
  // // expect(await page.waitForURL("Sdsds", { timeout: timeToMS(10, "s") })).toBe("222sdsds");
  // // await page.waitForURL("Sdsds", { timeout: timeToMS(10, "s") });
  // try {
  //   expect(await page.waitForURL("Sdsds")).toBe("jjhgjhgjhg");
  //   console.log("Page successfully redirected to:", "Sdsds");
  // } catch (error: any) {
  //   // Handle unexpected behavior
  //   if (error.name === "TimeoutError") {
  //     console.error("Timed out waiting for redirect to:", "Sdsds");
  //   } else {
  //     // Handle other potential errors
  //     console.error("Unexpected error during redirect:", error);
  //   }
  // }
  // // expect(await page.waitForURL("dfdsfsd", { timeout: timeToMS(10, "s") })).toBe("pageInfo.home.path");
  // expect(await page.waitForURL("dfdsfsd", { timeout: timeToMS(10, "s") })).toBe("pageInfo.home.path");
  // await page.getByLabel("Password").fill("6565656Lagos");
  // await page.get("Password").fill("6565656Lagos");
});
// await page.getByPlaceholder("username@email.com").fill("mariam.yamal@waverd.dev");
// await page.getByPlaceholder("Password").fill("2018WaveRD");
// await page.getByRole("button", { name: "Sign in" }).last().click();
