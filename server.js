import http from "http";
import chalk from "chalk";
import { writeHead } from "#helpers/writeHead.helper";
import fs from "fs";

http
  .createServer(function (req, res) {
    // je veux 2 gestions différentes :
    // - la gestion d'une requête qui arrive à la racine  (rien derrière 3000)
    // - la gesiton d'une requête qui arrive vers 3000/users

    if (req.url == "/users" && req.method === "GET") {
      writeHead(res, "text/html", fs.readFileSync("index.html"));
      res.write(fs.readFileSync("index.html"));
      res.end();
    }


    if(req.url == "/submit-form" && req.method === "POST") {
      let body = []
      req.on('data', (chunk) => {
        body.push(chunk)
      })

      req.on('end', () => {
         const credentials = Buffer.concat(body).toString("utf8")
         res.writeHead(200, { "content-type": "application/json"})
         res.end(JSON.stringify(credentials))
      })
    }


    if(req.url === "/login" && req.method === "GET") {
      writeHead(res, "text/html", fs.readFileSync("login.html"));
      res.write(fs.readFileSync("login.html"));
      res.end();
    }

    if (req.url == "/") {
      writeHead(res, "application/json", JSON.stringify({ message: "Tarzan" }));
      res.end(JSON.stringify({ message: "Tarzan" }));
    }

    if (req.url === "/img/chat" && req.method === "GET") {
      const img = fs.readFileSync("./chat.jpg")
      const fileName = "chat.jpg"
      const ext = fileName.split(".").pop()
      let cType = ""
      switch(ext) {
        case "png":
          cType = "image/png";
          break;
        case "jpg":
        case "jpeg":
          cType = "image/jpeg"
          break;
        default:
          break;
      }

      writeHead(res, cType, img)
      res.write(img)
      res.end()
    }

    if (req.url == "/css/index") {
      const css = fs.readFileSync("./css/index.css");
      res.writeHead(200, "Css retrieved", {
        "content-length": Buffer.byteLength(css),
        "content-type": "text/css",
      });
      res.end(css);
    }
  })
  .listen(3000, () => {
    console.log(chalk.blue("Server running at 3000"));
  });
