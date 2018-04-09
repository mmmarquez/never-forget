const express = require("express");
const { Nuxt, Builder } = require("nuxt");
const app = express();
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;
const puppeteer = require("puppeteer");

app.set("port", port);

// Import and Set Nuxt.js options
let config = require("../nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  console.log("Server listening on http://" + host + ":" + port); // eslint-disable-line no-console
}

start();

async function screen() {
  // const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  // Adjustments particular to this page to ensure we hit desktop breakpoint.
  page.setViewport({ width: 1664, height: 832, deviceScaleFactor: 1 });
  console.log("hi!");

  page.on("console", msg => console.log("PAGE LOG:", msg.text()));

  await page.goto("htpp://localhost:300", {
    waitUntil: "networkidle0"
  });

  /**rs
   * Takes a screenshot of a DOM element on the page, with optional padding.
   *
   * @param {!{path:string, selector:string, padding:(number|undefined)}=} opts
   * @return {!Promise<!Buffer>}
   */
  async function screenshotDOMElement(opts = {}) {
    console.log("hmm");
    const padding = "padding" in opts ? opts.padding : 0;
    const path = "path" in opts ? opts.path : null;
    const selector = opts.selector;

    if (!selector) throw Error("Please provide a selector.");

    const rect = await page.evaluate(selector => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const { x, y, width, height } = element.getBoundingClientRect();
      return { left: x, top: y, width, height, id: element.id };
    }, selector);

    if (!rect)
      throw Error(`Could not find element that matches selector: ${selector}.`);

    return await page.screenshot({ path });
    // clip: {
    //   x: rect.left - padding,
    //   y: rect.top - padding,
    //   width: rect.width + padding * 2,
    //   height: rect.height + padding * 2
    // }
  }

  await screenshotDOMElement({
    path: "-----element.png",
    selector: "canvas",
    padding: 16
  });

  browser.close();
}

screen();

// (async () => {

// })();
