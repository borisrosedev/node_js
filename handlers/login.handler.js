import { promises as fs } from "fs";
import writeHead from "../helpers/writeHead.helper.js";
import tryCatchHelper from "../helpers/tryCatch.helper.js";
import path from "path";

export default async (req, res) => {
  await tryCatchHelper(async () => {
    const body = await fs.readFile(
      path.join("./public/html/", "login.html"),
      "utf-8",
    );
    writeHead(res, body, 200, "text/html");
    res.write(body);
  }, res);
};
