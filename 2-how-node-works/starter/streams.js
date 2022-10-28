const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1
  //
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) console.error(err);
  //     res.end(data);
  //   });
  //
  //
  //
  // Solution 2: streams
  //
  //   const readable = fs.createReadStream("test-file.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     res.end();
  //   });
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not found!");
  //   });
  //
  //
  // But BACKPRESSURE is killing previous solution,
  // RAM is overloading with to much delay
  // of reading of source
  // and writing to another source!
  //
  // Solution 3
  //
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  // readableSource.pipe(writableSource);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening...");
});
