// @ts-check

import pageInfo from "utils/page-info";
import { ObjectEntries } from "utils/helpers";
import { test, expect } from "@playwright/test";
import { PageInfo } from "interfaces/utils/page-info";

test.setTimeout(0);

test("has correct meta data", async ({ page }) => {
  test.setTimeout(0);
  for (const [, { title, path, description, keywords }] of ObjectEntries<PageInfo>(pageInfo)) {
    test.setTimeout(0);
    console.log({ path, title, description, keywords });
    test.setTimeout(0);

    await page.goto(path);
    test.setTimeout(0);
    // await expect(page).toHaveURL(path);
    await expect(page).toHaveTitle(title);
    test.setTimeout(0);
  }
  test.setTimeout(0);
});

test.setTimeout(0);
