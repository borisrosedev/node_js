import { promises as fs } from "fs";
import writeHead from "../helpers/writeHead.helper.js";
import tryCatchHelper from "../helpers/tryCatch.helper.js";
import path from "path";
import getMimeTypeHelper from "../helpers/getMimeType.helper.js";

export default async (req, res) => {
  await tryCatchHelper(async () => {
    const imagePath = path.resolve("./public/images/", req.url.split("/")[2]);
    const image = await fs.readFile(imagePath);
    writeHead(res, image, 200, getMimeTypeHelper(imagePath));
    res.write(image);
  }, res);
};
