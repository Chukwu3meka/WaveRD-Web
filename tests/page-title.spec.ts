// @ts-check

import pageInfo from "utils/page-info";
import { ObjectEntries } from "utils/helpers";
import { test, expect } from "@playwright/test";
import { PageInfo } from "interfaces/utils/page-info";

// test.setTimeout(0);

test("Pages has correct meta data", async ({ page }) => {
  for (const [index, { title, path, description, keywords }] of ObjectEntries<PageInfo>(pageInfo)) {
    console.log(
      `(${(Object.keys(pageInfo).indexOf(index) + 1).toString().padStart(3, "0")}/${Object.values(pageInfo).length.toString().padStart(3, "0")}) - ${title}`
    );

    await page.goto(path);
    await expect(page).toHaveURL(path);
    await expect(page).toHaveTitle(title);
  }
});
