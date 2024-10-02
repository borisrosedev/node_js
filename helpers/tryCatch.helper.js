export default async (cb, res) => {
  try {
    return await cb();
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.write("Error reading file");
  }
};
