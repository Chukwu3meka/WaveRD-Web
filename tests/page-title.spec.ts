// // @ts-check

// import pageInfo from "utils/page-info";
// import { ObjectEntries } from "utils/helpers";
// import { test, expect } from "@playwright/test";
// import { PageInfo } from "interfaces/utils/page-info";

// test.setTimeout(0);

// test("has correct meta data", async ({ page }) => {
//   for (const [, { title, path, description, keywords }] of ObjectEntries<PageInfo>(pageInfo)) {
//     console.log({ path, title, description, keywords });

//     await page.goto(path);
//     // await expect(page).toHaveURL(path);
//     await expect(page).toHaveTitle(title);
//   }
// });
