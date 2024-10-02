import { promises as fs } from "fs";
import writeHead from "../helpers/writeHead.helper.js";
import path from "path";
import tryCatchHelper from "../helpers/tryCatch.helper.js";

export default async (req, res) => {
  await tryCatchHelper(async () => {
    const filePath = path.resolve("./public/html/index.html");
    const body = await fs.readFile(filePath, "utf-8");
    writeHead(res, body, 200, "text/html");
    res.write(body);
  }, res);
};
