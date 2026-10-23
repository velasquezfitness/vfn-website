import { expect, test } from "@playwright/test";

test("all pages render with metadata, working links, and no horizontal overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const path of ["/", "/coaching", "/about", "/apply", "/privacy"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("body")).toHaveCSS(
      "background-color",
      "rgb(11, 11, 11)",
    );
    await expect(page).toHaveTitle(/VFN/);
    expect(
      await page.locator('meta[name="description"]').getAttribute("content"),
    ).toBeTruthy();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    for (const link of await page.locator('a[href^="/"]').all()) {
      expect(["/", "/coaching", "/about", "/apply", "/privacy"]).toContain(
        await link.getAttribute("href"),
      );
    }
  }
  expect(errors).toEqual([]);
});

test("navigation supports mobile disclosure, Escape, and route changes", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  if (isMobile) {
    const toggle = page.getByRole("button", { name: /Menu \+|Close/ });
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await nav.getByRole("link", { name: "Coaching" }).focus();
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await expect(nav).toBeHidden();
    await toggle.click();
  }
  await nav.getByRole("link", { name: "Coaching" }).click();
  await expect(page).toHaveURL(/\/coaching$/);
  if (isMobile) await expect(nav).toBeHidden();
});

test("application validates fields without sending or claiming submission", async ({
  page,
}) => {
  await page.goto("/apply");
  const requests: string[] = [];
  page.on("request", (r) => {
    if (r.method() === "POST" || r.url().includes("?name="))
      requests.push(r.url());
  });
  await expect(page.getByText("Applications are not open yet.")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Submit application — unavailable" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Check application" }).click();
  expect(
    await page
      .locator("form")
      .evaluate((f: HTMLFormElement) => f.checkValidity()),
  ).toBe(false);
  await page.getByLabel("Full name").fill("Test Applicant");
  await page.getByLabel("Email address").fill("invalid-email");
  await page.getByLabel("Where are you based?").fill("San Juan / AST");
  await page.getByLabel("Training experience").selectOption({ index: 1 });
  await page.getByLabel("Primary fitness goal").selectOption({ index: 1 });
  await page.getByLabel("Preferred coaching format").selectOption({ index: 1 });
  await page
    .getByLabel("What do you want to work toward?")
    .fill("Build a consistent strength training routine.");
  await page
    .getByLabel("Current training frequency")
    .selectOption({ index: 2 });
  await page.getByLabel("Equipment access").selectOption({ index: 1 });
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Check application" }).click();
  expect(
    await page
      .getByLabel("Email address")
      .evaluate((e: HTMLInputElement) => e.validity.typeMismatch),
  ).toBe(true);
  await page.getByLabel("Email address").fill("test@example.com");
  await page.getByRole("button", { name: "Check application" }).click();
  await expect(page.getByRole("status")).toContainText(
    "This is not a submitted application",
  );
  await expect(page.getByRole("status")).toBeFocused();
  expect(requests).toEqual([]);
  await page.getByLabel("Full name").fill("Edited Name");
  await expect(
    page.getByText("Your form passes the field checks."),
  ).toHaveCount(0);
});

test("coaching FAQs expand with keyboard and unknown routes return 404", async ({
  page,
}) => {
  await page.goto("/coaching");
  const question = page.locator("summary").first();
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  const response = await page.goto("/not-a-real-page");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
});

test("method anchor, founder background, and honest results placeholder", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Explore the method" }).click();
  await expect(page).toHaveURL(/#method$/);
  for (const stage of ["Understand", "Build", "Execute", "Evolve", "Master"]) {
    await expect(
      page.getByRole("heading", { name: stage, exact: true }),
    ).toBeVisible();
  }
  await expect(
    page.getByText(
      "Approved client results and stories have not yet been supplied.",
    ),
  ).toBeVisible();
  await page.getByRole("link", { name: "Meet your coach" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Sebastian",
  );
  await expect(
    page
      .getByRole("list", { name: "Professional and athletic background" })
      .getByRole("listitem"),
  ).toHaveCount(4);
});

test("skip navigation and reduced motion are available", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});
