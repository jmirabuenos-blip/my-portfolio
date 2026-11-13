const { chromium } = require("@playwright/test");
const fs = require("node:fs");
const assert = require("node:assert/strict");
(async () => {
  fs.mkdirSync("tmp/portfolio-qa", { recursive: true });
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
    args: ["--enable-webgl", "--ignore-gpu-blocklist"],
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const checks = [];
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    for (const route of [
      "/",
      "/projects",
      "/about",
      "/education",
      "/contact",
    ]) {
      await page.goto("http://127.0.0.1:3000" + route, {
        waitUntil: "networkidle",
      });
      await page.locator("h1").waitFor();
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `${route} overflow at ${width}`,
      );
      assert.equal(await page.locator("h1").count(), 1);
      if (width !== 320)
        await page.screenshot({
          path: `tmp/portfolio-qa/${route === "/" ? "home" : route.slice(1)}-${width}.png`,
          fullPage: route !== "/",
        });
      checks.push(`${route} at ${width}px: heading and overflow passed`);
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
  await page.waitForFunction(() =>
    document.querySelector(".orbital-art img")?.complete,
  );
  await page.getByRole("button", { name: "Education", exact: true }).click();
  assert.equal(
    await page
      .getByRole("button", { name: "Education", exact: true })
      .getAttribute("aria-pressed"),
    "true",
  );
  await page
    .getByRole("link", { name: "Explore Education", exact: true })
    .click();
  assert.equal(new URL(page.url()).hash, "#education");
  await page.getByRole("button", { name: "Frameworks & Libraries" }).click();
  await page
    .locator(".skill-cloud")
    .getByText("React", { exact: true })
    .waitFor();
  await page.getByRole("button", { name: "Lo-fi & focus" }).click();
  await page.getByRole("button", { name: "Play ambient chord" }).click();
  await page.getByRole("button", { name: "Stop ambient chord" }).click();
  await page.getByRole("button", { name: "Coffee rituals" }).click();
  await page.getByRole("heading", { name: "Before the first line." }).waitFor();
  await page.getByRole("button", { name: "Basketball", exact: true }).click();
  await page.getByRole("button", { name: "Clip 2" }).click();
  await page.waitForFunction(
    () => document.querySelector("video").readyState >= 1,
  );
  assert.ok(await page.locator("video").evaluate((v) => v.duration > 0));
  await page.getByRole("button", { name: "Pause world animation", exact: true }).click();
  assert.equal(await page.locator(".orbital-world").evaluate(e => e.classList.contains("is-still")), true);
  await page.getByRole("button", { name: "Resume world animation" }).click();
  await page.locator(".orbital-world.is-moving").waitFor();
  checks.push(
    "Layered artwork, destinations, skill explorer, all hobbies, video metadata, ambient audio, and still-view toggle passed",
  );
  await page.goto("http://127.0.0.1:3000/projects", {
    waitUntil: "networkidle",
  });
  await page
    .getByRole("button", { name: "AI & experiments", exact: true })
    .click();
  assert.equal(await page.locator(".project").count(), 1);
  assert.match(await page.locator(".project h3").innerText(), /AIVA/);
  await page.getByRole("button", { name: "All projects", exact: true }).click();
  assert.equal(await page.locator(".project").count(), 3);
  await page.goto("http://127.0.0.1:3000/contact", {
    waitUntil: "networkidle",
  });
  assert.equal(
    await page.locator("form").evaluate((f) => f.checkValidity()),
    false,
  );
  await page.getByLabel("Your name").fill("Portfolio test");
  await page.getByLabel("Your email").fill("test@example.com");
  await page
    .getByLabel("What are you thinking?")
    .fill("Checking the email draft flow.");
  assert.equal(
    await page.locator("form").evaluate((f) => f.checkValidity()),
    true,
  );
  await page.getByRole("button", { name: "Open email draft" }).click();
  await page
    .getByRole("status")
    .filter({ hasText: "Your email app was requested" })
    .waitFor();
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "Copy email address" }).click();
  assert.equal(
    await page.evaluate(() => navigator.clipboard.readText()),
    "Jmirabuenos@gbox.ncf.edu.ph",
  );
  checks.push(
    "Project filtering, contact validation, email draft handoff, and clipboard passed",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .locator("#mobile-nav")
    .getByRole("link", { name: "About" })
    .focus();
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("#mobile-nav").count(), 0);
  assert.equal(
    await page
      .getByRole("button", { name: "Open navigation" })
      .evaluate((e) => e === document.activeElement),
    true,
  );
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.locator("#mobile-nav").getByRole("link", { name: "Work" }).click();
  await page.waitForURL("**/projects");
  assert.equal(await page.locator("#mobile-nav").count(), 0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
  assert.equal(
    await page
      .getByRole("button", { name: "Pause world animation" })
      .isDisabled(),
    true,
  );
  assert.equal(
    await page.locator("h1").evaluate((e) => getComputedStyle(e).animationName),
    "none",
  );
  checks.push(
    "Mobile navigation, Escape focus restoration, and reduced motion passed",
  );
  const fallback = await browser.newPage({
    viewport: { width: 390, height: 844 },
  });
  await fallback.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (
        type === "webgl" ||
        type === "webgl2" ||
        type === "experimental-webgl"
      )
        return null;
      return original.call(this, type, ...args);
    };
  });
  await fallback.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
  await fallback.waitForFunction(() =>
    document.querySelector(".orbital-art img")?.complete,
  );
  await fallback
    .getByRole("link", { name: "Explore Work", exact: true })
    .click();
  assert.equal(new URL(fallback.url()).hash, "#work");
  checks.push("Artwork and content navigation work with WebGL disabled");
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    "tmp/portfolio-qa/results.json",
    JSON.stringify({ checks, errors }, null, 2),
  );
  console.log(JSON.stringify({ checks, errors }, null, 2));
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

