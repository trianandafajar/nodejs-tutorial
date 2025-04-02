import http from "http";
import fs from "fs/promises";
import path from "path";

const read = async (filePath) => {
  try {
    return await fs.readFile(path.resolve(filePath), "utf-8");
  } catch (error) {
    return "<h1>500 Internal Server Error</h1>";
  }
};

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  let filePath = "";
  switch (req.url) {
    case "/":
      filePath = "./src/page/home.html";
      break;
    case "/about":
      filePath = "./src/page/about.html";
      break;
    case "/personal":
      filePath = "./src/page/personal.html";
      break;
    default:
      filePath = "./src/page/404.html"; // Halaman Not Found
      res.statusCode = 404;
      break;
  }

  const page = await read(filePath);
  res.end(page);
});

server.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});
