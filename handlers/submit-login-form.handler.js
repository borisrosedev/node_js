import { parse } from "querystring";
import writeHead from "../helpers/writeHead.helper.js";

export default (req, res) => {
  let body = "";

  req.on("data", chunk => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const parsedBody = parse(body);
    writeHead(res, JSON.stringify(parsedBody), 200, "application/json");
    res.write(JSON.stringify(parsedBody));
    res.end();
  });
};
