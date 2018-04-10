// const express = require("express");
// const { Nuxt, Builder } = require("nuxt");
// const app = express();
// const host = process.env.HOST || "localhost";
// const port = process.env.PORT || 3000;
const puppeteer = require("puppeteer");
const url = "https://always-remember.now.sh/";
// // const url = "localhost";

const firebase = require("firebase");

var conf = {
  apiKey: "AIzaSyC0n44Sfq-bjAyVV-q1MbqzRqP50WQNAJc",
  authDomain: "backend-65b11.firebaseapp.com",
  databaseURL: "https://backend-65b11.firebaseio.com",
  projectId: "backend-65b11",
  storageBucket: "backend-65b11.appspot.com",
  messagingSenderId: "773970614768"
};

firebase.initializeApp(conf);
var database = firebase.database();

function writePrescription(times, data) {
  console.log(data);
  firebase
    .database()
    .ref("never_forget/" + times + "/")
    .set({
      url: data
    });
}

// var server = require("http").createServer(app);
// var io = require("socket.io")(server);

// app.set("port", port);

// // Import and Set Nuxt.js options
// let config = require("../nuxt.config.js");
// config.dev = !(process.env.NODE_ENV === "production");

// async function start() {
//   // Init Nuxt.js
//   const nuxt = new Nuxt(config);

//   // Build only in dev mode
//   if (config.dev) {
//     const builder = new Builder(nuxt);
//     await builder.build();
//   }

//   // Give nuxt middleware to express
//   app.use(nuxt.render);

//   // Listen the server
//   // app.listen(port, host);

//   server.listen(port, host);

// start();

const { Nuxt, Builder } = require("nuxt");
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === "production";

// We instantiate Nuxt.js with the options
let config = require("../nuxt.config.js");
config.dev = !isProd;

const nuxt = new Nuxt(config);
// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt);
  builder.build();
}
app.use(nuxt.render);

// POST method route
app.post("/", function(req, res) {
  res.send("POST request to the homepage");

  console.log(res);
});

// Listen the server
server.listen(port, "0.0.0.0");
console.log("Server listening on localhost:" + port); // eslint-disable-line no-console

// Socket.io
// let messages = [];
// io.on("connection", socket => {
//   socket.on("last-messages", function(fn) {
//     fn(messages.slice(-50));
//   });
//   socket.on("send-message", function(message) {
//     messages.push(message);
//     socket.broadcast.emit("new-message", message);
//   });
// });

io.on("connection", socket => {
  socket.on("huey", function(data) {
    console.warn("HUUEEEYYYYYY");
  });
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
      page.setViewport({ width: 1664, height: 832, deviceScaleFactor: 1 });
      await page.goto(
        url + "?coords=" + data["message"][0] + "," + data["message"][1]
      );
      await delay(1000);

      await page.screenshot({
        path:
          "./static/panos/" + data["message"][2].toString() + "_screenshot.png",
        selector: "canvas"
      });
      await browser.close();
      let addy = data["message"][2].toString() + "_screenshot.png";
      await delay(1000);

      writePrescription(data["message"][2], addy);
      socket.emit("ready", { data: "test" });
    })();
  });
});
