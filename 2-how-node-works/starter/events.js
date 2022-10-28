const EventEmitter = require("events");

class Sales extends EventEmitter {
  constructor() {
    super();
  }

}

const myEmitter = new Sales();
myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Customer name: Severyn");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock.`);
});

myEmitter.emit("newSale", 9);

////////////////////////////////////////////////////////////////

const http = require("http");

const server = http.createServer();

server.on("request", (request, response) => {
  console.log("Request recived!");
  response.end("Request recived!");
});

// server.on("request", (request, response) => {
//   response.end("Another request!");
// });

server.on("close", (request, response) => {
  console.log("Server closed.");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for request...");
});
