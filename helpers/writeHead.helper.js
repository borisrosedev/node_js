export default (res, body, statusCode = 200, contentType = "text/plain") => {
  if (body) {
    res.writeHead(statusCode, {
      "Content-Type": contentType,
      "Content-Length": Buffer.byteLength(body),
    });
  } else {
    res.statusCode = 200;
  }
};
