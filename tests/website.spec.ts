import { expect, test, type Page } from "@playwright/test";
import sharp from "sharp";
import spanish from "../src/i18n/es.json";

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
      expect([
        "/",
        "/coaching",
        "/about",
        "/apply",
        "/privacy",
        "/es",
        "/es/coaching",
        "/es/about",
        "/es/apply",
        "/es/privacy",
      ]).toContain(await link.getAttribute("href"));
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

// Block the real provider in every test, even if a test accidentally submits.
test.beforeEach(async ({ page }) => {
  await page.route("https://formspree.io/**", (route) => route.abort());
});

async function fillApplication(page: Page) {
  await page.locator('[name="name"]').fill("Test Applicant");
  await page.locator('[name="email"]').fill("test@example.com");
  await page.locator('[name="location"]').fill("San Juan / AST");
  for (const name of [
    "primaryGoal",
    "format",
    "experience",
    "days",
    "equipment",
  ]) {
    await page.locator(`[name="${name}"]`).selectOption({ index: 1 });
  }
  await page
    .locator('[name="goals"]')
    .fill("Build a consistent strength training routine.");
  await page.getByRole("checkbox").check();
}

test("application validation prevents invalid submissions", async ({
  page,
}) => {
  let requests = 0;
  await page.route("https://formspree.io/**", (route) => {
    requests++;
    return route.abort();
  });
  await page.goto("/apply");
  await page.getByRole("button", { name: "Submit application" }).click();
  expect(
    await page
      .locator("form")
      .evaluate((form: HTMLFormElement) => form.checkValidity()),
  ).toBe(false);
  await fillApplication(page);
  await page.locator('[name="email"]').fill("invalid-email");
  await page.getByRole("button", { name: "Submit application" }).click();
  expect(
    await page
      .locator('[name="email"]')
      .evaluate((input: HTMLInputElement) => input.validity.typeMismatch),
  ).toBe(true);
  expect(requests).toBe(0);
});

test("mocked Formspree success sends fields once, disables sending, and resets", async ({
  page,
}) => {
  let requests = 0;
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("https://formspree.io/f/mdeeeown", async (route) => {
    requests++;
    expect(route.request().method()).toBe("POST");
    expect(route.request().postData()).toContain("test@example.com");
    await gate;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });
  await page.goto("/apply");
  await fillApplication(page);
  await page.getByRole("button", { name: "Submit application" }).click();
  await expect(
    page.getByRole("button", { name: "Sending application…" }),
  ).toBeDisabled();
  expect(requests).toBe(1);
  release();
  await expect(page.getByRole("status")).toContainText("Application sent.");
  await expect(page.getByRole("status")).toBeFocused();
  await expect(page.locator('[name="name"]')).toHaveValue("");
  await expect(page.getByRole("checkbox")).not.toBeChecked();
});

for (const failure of ["provider", "network"] as const) {
  test(`mocked Formspree ${failure} failure retains entries and permits retry`, async ({
    page,
  }) => {
    let requests = 0;
    await page.route("https://formspree.io/f/mdeeeown", (route) => {
      requests++;
      if (requests > 1)
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: '{"ok":true}',
        });
      return failure === "network"
        ? route.abort()
        : route.fulfill({
            status: 500,
            contentType: "application/json",
            body: '{"error":"Unavailable"}',
          });
    });
    await page.goto("/apply");
    await fillApplication(page);
    await page.getByRole("button", { name: "Submit application" }).click();
    await expect(page.getByRole("status")).toContainText(
      "We couldn’t send your application.",
    );
    await expect(page.locator('[name="email"]')).toHaveValue(
      "test@example.com",
    );
    await expect(page.getByRole("status")).toBeFocused();
    await page.getByRole("button", { name: "Submit application" }).click();
    await expect(page.getByRole("status")).toContainText("Application sent.");
    expect(requests).toBe(2);
  });
}

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
  await expect(page.locator(".results-placeholder")).toHaveCount(0);
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
    page.getByRole("button", { name: "Submit application" }),
  ).toBeEnabled();
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
    "/images/vfn-emblem-transparent.png",
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

test("header and footer use the same transparent original emblem without CSS masking", async ({
  page,
}) => {
  const [original, cutout] = await Promise.all([
    sharp("public/images/Metallic Panther V Emblem.png")
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true }),
    sharp("public/images/vfn-emblem-transparent.png")
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true }),
  ]);
  expect(cutout.info.width).toBe(original.info.width);
  expect(cutout.info.height).toBe(original.info.height);
  let transparent = 0;
  let changedColorPixels = 0;
  for (let i = 0; i < cutout.data.length; i += 4) {
    if (cutout.data[i + 3] === 0) transparent++;
    if (
      cutout.data[i] !== original.data[i] ||
      cutout.data[i + 1] !== original.data[i + 1] ||
      cutout.data[i + 2] !== original.data[i + 2]
    )
      changedColorPixels++;
  }
  expect(transparent).toBeGreaterThan(
    (original.info.width * original.info.height) / 2,
  );
  expect(changedColorPixels).toBe(0);
  for (const [x, y] of [
    [0, 0],
    [1253, 0],
    [0, 1253],
    [1253, 1253],
  ])
    expect(cutout.data[(y * cutout.info.width + x) * 4 + 3]).toBe(0);
  for (const [x, y] of [
    [300, 250],
    [900, 250],
    [600, 950],
    [620, 430],
  ])
    expect(cutout.data[(y * cutout.info.width + x) * 4 + 3]).toBe(255);
  await page.goto("/coaching");
  const sourcePaths: string[] = [];
  for (const scope of [
    page.getByRole("banner"),
    page.getByRole("contentinfo"),
  ]) {
    const link = scope.getByRole("link", { name: "VFN — Home" });
    const image = link.getByRole("img", {
      name: "VFN silver V-and-panther emblem",
    });
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((element: HTMLImageElement) => element.decode());
    await expect(image).toBeVisible();
    await expect(image).toHaveCSS("mix-blend-mode", "normal");
    await expect(image).toHaveCSS("filter", "none");
    expect(await link.textContent()).toBe("");
    sourcePaths.push(
      new URL(
        await image.evaluate((element: HTMLImageElement) => element.currentSrc),
      ).searchParams.get("url")!,
    );
    expect(
      await image.evaluate(
        (element: HTMLImageElement) => element.width === element.height,
      ),
    ).toBe(true);
  }
  expect(sourcePaths).toEqual([
    "/images/vfn-emblem-transparent.png",
    "/images/vfn-emblem-transparent.png",
  ]);
  await expect(page.getByRole("contentinfo")).toContainText(
    "1% Better Everyday.",
  );
  await page
    .getByRole("contentinfo")
    .getByRole("link", { name: "VFN — Home" })
    .click();
  await expect(page).toHaveURL("/");
});

const publicPaths = ["/", "/coaching", "/about", "/apply", "/privacy"];

test("all Spanish routes are server-rendered, translated, and have reciprocal SEO metadata", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const path of publicPaths) {
    const esPath = path === "/" ? "/es" : `/es${path}`;
    const response = await page.goto(esPath);
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "es-PR");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
      "content",
      "es_PR",
    );
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(new URL(canonical!, "http://127.0.0.1:3100").pathname).toBe(esPath);
    for (const [lang, expected] of [
      ["en", path],
      ["es-PR", esPath],
      ["x-default", path],
    ]) {
      const href = await page
        .locator(`link[rel="alternate"][hreflang="${lang}"]`)
        .getAttribute("href");
      expect(new URL(href!, "http://127.0.0.1:3100").pathname).toBe(expected);
    }
    const body = (await page.locator("main").innerText()).replace(/\s+/g, " ");
    for (const [english, translated] of Object.entries(spanish)) {
      if (english !== translated && english.split(" ").length >= 6)
        expect(body).not.toContain(english);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    for (const link of await page.locator('a[href^="/"]').all()) {
      const href = await link.getAttribute("href");
      if (await link.getAttribute("hrefLang")) continue;
      expect(href).toMatch(/^\/es(?:\/|$)/);
    }
    const esTitle = await page.title();
    await page.getByRole("link", { name: "English", exact: true }).click();
    await expect(page).toHaveURL(path);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    expect(await page.title()).not.toBe(esTitle);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
      "content",
      "en_US",
    );
  }
  expect(errors).toEqual([]);
});

test("language selector preserves page, query and fragment, and Spanish navigation", async ({
  page,
  isMobile,
}) => {
  await page.goto("/coaching?source=review#offerings");
  await page.getByRole("link", { name: "Español", exact: true }).click();
  await expect(page).toHaveURL("/es/coaching?source=review#offerings");
  await expect(
    page.getByRole("link", { name: "Español", exact: true }),
  ).toHaveAttribute("aria-current", "true");
  const nav = page.getByRole("navigation", { name: "Navegación principal" });
  if (isMobile) {
    const menu = page.getByRole("button", { name: "Menú +" });
    await menu.click();
    await nav.getByRole("link", { name: "Sobre VFN" }).focus();
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
    await menu.click();
  }
  await nav.getByRole("link", { name: "Sobre VFN" }).click();
  await expect(page).toHaveURL("/es/about");
  await page
    .getByRole("contentinfo")
    .getByRole("link", { name: "Privacidad", exact: true })
    .click();
  await expect(page).toHaveURL("/es/privacy");
  await page.getByRole("link", { name: "English", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/privacy");
});

test("Spanish form uses localized validation and mocked success with stable provider values", async ({
  page,
}) => {
  let requests = 0;
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("https://formspree.io/f/mdeeeown", async (route) => {
    requests++;
    const payload = route.request().postData()!;
    expect(payload).toContain('name="language"');
    expect(payload).toContain("\r\nes\r\n");
    expect(payload).toContain("Build strength");
    expect(payload).not.toContain("Desarrollar fuerza");
    await gate;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: '{"ok":true}',
    });
  });
  await page.goto("/es/apply");
  await page.getByRole("button", { name: "Enviar solicitud" }).click();
  expect(
    await page
      .locator('[name="name"]')
      .evaluate((input: HTMLInputElement) => input.validationMessage),
  ).toBe("Completa este campo.");
  expect(requests).toBe(0);
  await fillApplication(page);
  await page.locator('[name="email"]').fill("invalid-email");
  await page.getByRole("button", { name: "Enviar solicitud" }).click();
  expect(
    await page
      .locator('[name="email"]')
      .evaluate((input: HTMLInputElement) => input.validationMessage),
  ).toBe("Ingresa un correo electrónico válido.");
  await page.locator('[name="email"]').fill("test@example.com");
  await page.getByRole("button", { name: "Enviar solicitud" }).click();
  await expect(
    page.getByRole("button", { name: "Enviando solicitud…" }),
  ).toBeDisabled();
  release();
  await expect(page.getByRole("status")).toContainText("Solicitud enviada.");
  await expect(page.getByRole("status")).toBeFocused();
  expect(requests).toBe(1);
  await expect(page.locator('[name="name"]')).toHaveValue("");
});

for (const failure of ["provider", "network"] as const) {
  test(`Spanish mocked ${failure} error preserves entries and supports retry`, async ({
    page,
  }) => {
    let attempts = 0;
    await page.route("https://formspree.io/f/mdeeeown", (route) => {
      attempts++;
      if (attempts > 1)
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: '{"ok":true}',
        });
      return failure === "network"
        ? route.abort()
        : route.fulfill({
            status: 422,
            contentType: "application/json",
            body: '{"errors":[{"message":"Invalid submission"}]}',
          });
    });
    await page.goto("/es/apply");
    await fillApplication(page);
    await page.getByRole("button", { name: "Enviar solicitud" }).click();
    await expect(page.getByRole("status")).toContainText(
      "No pudimos enviar tu solicitud.",
    );
    await expect(page.locator('[name="email"]')).toHaveValue(
      "test@example.com",
    );
    await page.getByRole("button", { name: "Enviar solicitud" }).click();
    await expect(page.getByRole("status")).toContainText("Solicitud enviada.");
    expect(attempts).toBe(2);
  });
}

test("English remains the default regardless of browser language and internal aliases redirect", async ({
  browser,
  page,
}) => {
  const context = await browser.newContext({ locale: "es-PR" });
  const spanishBrowser = await context.newPage();
  await spanishBrowser.goto("http://127.0.0.1:3100/");
  await expect(spanishBrowser.locator("html")).toHaveAttribute("lang", "en");
  await context.close();
  await page.goto("/en/coaching?test=alias");
  await expect(page).toHaveURL("/coaching?test=alias");
  const response = await page.goto("/es/not-a-real-page");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("link", { name: "Volver al inicio" }),
  ).toBeVisible();
});
