export function writeHead(res, contentType, body, statusCode = 200) {
  res.writeHead(statusCode, {
    "Content-Type": contentType,
    "Content-Length": Buffer.byteLength(body),
  });
}
