const express = require("express");
const { Nuxt, Builder } = require("nuxt");
const app = express();
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 8080;
const puppeteer = require("puppeteer");

var server = require("http").createServer(app);
var io = require("socket.io")(server);

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
  // app.listen(port, host);

  server.listen(port);

  // Socket.io
  let messages = [];
  io.on("connection", socket => {
    socket.on("last-messages", function(data) {
      console.log("data????, " + data);

      function delay(timeout) {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
      }

      (async () => {
        const browser = await puppeteer.launch({
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
          headless: true
        });
        console.log("hm: ", data["message"][0]);

        const page = await browser.newPage();
        // await page.goto("http://" + host + ":" + port);
        page.setViewport({
          width: 1664,
          height: 832,
          deviceScaleFactor: 1
        });
        await page.goto(
          "http://" +
            host +
            ":" +
            port +
            "/pano?coords=" +
            data["message"][0] +
            "," +
            data["message"][1]
        );
        await delay(1000);

        await page.screenshot({
          path:
            "./static/panos/" +
            data["message"][2].toString() +
            "_screenshot.png",
          selector: "canvas"
        });
        await browser.close();
      })();
    });
  });
}

start();
