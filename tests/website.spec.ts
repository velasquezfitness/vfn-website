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

test("original brand images decode through the image optimizer on every placement", async ({
  page,
}) => {
  const assets = {
    kettlebells: "VFN-Kettlebell-Hero (1).jpg",
    portrait: "Arise Professional -65.JPG",
    panther: "IMG_0825.JPG",
  };
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  for (const [route, kinds] of [
    ["/", ["kettlebells", "panther", "portrait"]],
    ["/coaching", ["kettlebells"]],
    ["/about", ["portrait"]],
  ] as const) {
    await page.goto(route);
    await expect(page.locator(".asset-placeholder")).toHaveCount(0);
    for (const kind of kinds) {
      const image = page.locator(`.photo-${kind} img`);
      await image.scrollIntoViewIfNeeded();
      await expect(image).toBeVisible();
      await image.evaluate((element: HTMLImageElement) => element.decode());
      const details = await image.evaluate((element: HTMLImageElement) => ({
        width: element.naturalWidth,
        height: element.naturalHeight,
        source: element.currentSrc,
        alt: element.alt,
      }));
      expect(details.width).toBeGreaterThan(0);
      expect(details.height).toBeGreaterThan(0);
      expect(details.alt).toBeTruthy();
      const url = new URL(details.source);
      expect(url.pathname).toBe("/_next/image");
      expect(url.searchParams.get("url")).toBe(
        `/images/${encodeURIComponent(assets[kind])}`,
      );
      const response = await page.request.get(details.source);
      expect(response.ok()).toBe(true);
      expect(response.headers()["content-type"]).toMatch(/^image\//);
    }
  }
  expect(errors).toEqual([]);
});

test("approved homepage photo placements use a presentation-only monochrome treatment", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.locator(".editorial-hero .photo-portrait img"),
  ).toBeVisible();
  await expect(page.locator(".editorial-hero .photo-kettlebells")).toHaveCount(
    0,
  );
  const founder = page.locator(".founder-section .photo-kettlebells img");
  await founder.scrollIntoViewIfNeeded();
  await expect(founder).toBeVisible();
  await expect(page.locator(".founder-section .photo-portrait")).toHaveCount(0);
  for (const selector of [
    ".editorial-hero .photograph",
    ".founder-section .photograph",
  ]) {
    expect(
      await page
        .locator(selector)
        .evaluate((element) => getComputedStyle(element).filter),
    ).toContain("grayscale(1)");
  }
});

test("coaching packages distinguish independent PDF training from ongoing support", async ({
  page,
}) => {
  await page.goto("/coaching");
  const method = page.getByRole("article", { name: "VFN Method", exact: true });
  const coaching = page.getByRole("article", {
    name: "VFN Coaching",
    exact: true,
  });
  const performance = page.getByRole("article", {
    name: "VFN Performance",
    exact: true,
  });
  await expect(method).toContainText("Eight weeks · one-time purchase");
  await expect(method).toContainText("PDF delivery");
  await expect(method).toContainText("No ongoing coaching or check-ins");
  await expect(coaching).toContainText("Biweekly check-ins (every two weeks)");
  await expect(performance).toContainText("Weekly check-ins");
  await expect(performance).toContainText("Technique video reviews");
  await expect(performance).toContainText("Priority support");
  await expect(page.locator("main")).not.toContainText(/\$(79|119|229)/);
  await method.getByRole("link", { name: "View program details" }).click();
  await expect(page).toHaveURL(/#method-program$/);
  await expect(page.locator("#method-program")).toContainText(
    "before this program can be purchased",
  );
  await coaching.getByRole("link", { name: "Apply for Coaching" }).click();
  await expect(page).toHaveURL(/\/apply$/);
  await expect(
    page.getByRole("button", { name: "Submit application — unavailable" }),
  ).toBeDisabled();
  await page.goto("/coaching");
  await performance
    .getByRole("link", { name: "Apply for Performance" })
    .click();
  await expect(page).toHaveURL(/\/apply$/);
});

test("approved silver emblem replaces header text without changing home navigation", async ({
  page,
}) => {
  await page.goto("/coaching");
  const home = page
    .getByRole("banner")
    .getByRole("link", { name: "VFN — Home" });
  const emblem = home.getByRole("img", {
    name: "VFN silver V-and-panther emblem",
  });
  await expect(emblem).toBeVisible();
  await emblem.evaluate((image: HTMLImageElement) => image.decode());
  expect(await home.textContent()).toBe("");
  const details = await emblem.evaluate((image: HTMLImageElement) => ({
    source: image.currentSrc,
    width: image.getBoundingClientRect().width,
    height: image.getBoundingClientRect().height,
    fit: getComputedStyle(image).objectFit,
  }));
  expect(details.width).toBe(details.height);
  expect(details.width).toBeGreaterThanOrEqual(44);
  expect(details.fit).toBe("contain");
  expect(new URL(details.source).searchParams.get("url")).toBe(
    "/images/Metallic%20Panther%20V%20Emblem.png",
  );
  const response = await page.request.get(details.source);
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toMatch(/^image\//);
  await home.click();
  await expect(page).toHaveURL("/");
  const panther = page.locator("#method .photo-panther img");
  await panther.scrollIntoViewIfNeeded();
  await panther.evaluate((image: HTMLImageElement) => image.decode());
  await expect(panther).toHaveCSS("object-fit", "contain");
  await expect(panther).toHaveCSS("filter", "none");
});
