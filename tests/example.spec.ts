import { test, expect, Page } from '@playwright/test';


test.describe.configure({ mode: 'serial' });

let sharedPage: Page;

test.beforeAll(async ({ browser }) => {
  sharedPage = await browser.newPage();
});

test.afterAll(async () => {
  await sharedPage.close();
});

test('Step 1: Open YouTube and check title', async () => {
  await sharedPage.goto('https://youtube.com');
  await expect(sharedPage).toHaveTitle(/YouTube/);
});

test('Step 2: Search for Spiderman', async () => {
  const searchInput = sharedPage.getByPlaceholder('Search');
  await searchInput.fill("Spiderman Trailer");
  await searchInput.press('Enter');
  await expect(sharedPage).toHaveURL(/.*search_query=Spiderman\+Trailer.*/);
});

test('Step 3: Click the first video', async () => {
  // 1. Locate all elements that match YouTube's video title selector
  // 2. Use .first() to target only the very first result on the page
  const firstVideo = sharedPage.locator('#video-title').first();

  // 3. Optional: Wait for the element to be visible to avoid clicking blank skeletons
  await expect(firstVideo).toBeVisible();

  // 4. Click the video
  await firstVideo.click();

  // 5. Verify the URL changed to a watch page (contains "watch?v=")
  await expect(sharedPage).toHaveURL(/.*watch\?v=.*/);
});