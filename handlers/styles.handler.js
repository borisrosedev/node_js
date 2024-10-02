import { promises as fs } from "fs";
import tryCatchHelper from "../helpers/tryCatch.helper.js";
import writeHead from "../helpers/writeHead.helper.js";
import path from "path";

export default async (req, res) => {
  await tryCatchHelper(async () => {
    const body = await fs.readFile(
      path.resolve("./public/css/styles.css"),
      "utf-8",
    );
    writeHead(res, body, 200, "text/css");
    res.write(body);
  }, res);
};
