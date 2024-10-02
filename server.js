import http from "http";
import chalk from "chalk";
import rootHandler from "./handlers/root.handler.js";
import stylesHandler from "./handlers/styles.handler.js";
import loginHandler from "./handlers/login.handler.js";
import submitLoginFormHandler from "./handlers/submit-login-form.handler.js";
import imageHandler from "./handlers/image.handler.js";

const server = http.createServer(async function (req, res) {
  if (req.url == "/" && req.method === "GET") {
    await rootHandler(req, res);
    res.end();
  }

  if (req.url == "/styles" && req.method === "GET") {
    await stylesHandler(req, res);
    res.end();
  }

  if (req.url == "/login" && req.method === "GET") {
    await loginHandler(req, res);
    res.end();
  }

  if (req.url.startsWith("/files/") && req.method == "GET") {
    await imageHandler(req, res);
    res.end();
  }

  if (req.method === "POST" && req.url == "/submit-login-form") {
    submitLoginFormHandler(req, res);
  }
});

server.listen(3000, () => {
  console.log(chalk.blue("✅ Server running at http://localhost:3000"));
});
