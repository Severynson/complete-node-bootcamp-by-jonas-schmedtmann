const fs = require("fs");
const http = require("http");
const url = require("url");

// const hello = "Hello world";
// console.log(hello);

// const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textInput);

// const textOut = `This is what we know about the avocado: ${textInput}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written!");

// // Non-blocking, asynchronous way
// fs.readFile("./txt/output.txt", "utf-8", (error, data) => {
//   if (error) console.error(error);
//   else console.log(data);
// });
// console.log("Will read file");

const errorHandler = (error) => {
  if (error) console.error(error);
};

// fs.readFile("./txt/start.txt", "utf-8", (error, data1) => {
//   errorHandler(error);
//   console.log(data1);
//   fs.readFile("./txt/" + data1 + ".txt", "utf-8", (error, data2) => {
//     errorHandler(error);
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (error, data3) => {
//       errorHandler(error);
//       console.log(data3);

//       fs.writeFile(
//         "./txt/final.txt",
//         `${data2}\n${data3}`,
//         "utf-8",
//         (error) => {
//           errorHandler(error);
//         }
//       );
//     });
//   });
// });

/////////////////////////////////////////////////
// SERVER

function replaceTemplate(template, product) {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
}

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const error404 = (response) => {
  response.writeHead(404, {
    "Content-type": "text/html",
    "my-own-header": "hello-world",
  });
  response.end(
    `<h1>
         404 error, current relative path doesn't exist!
      </h1>`
  );
};

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  router(req, res);
});

const router = (req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  switch (pathname) {
    case "/":
      res.writeHead(200, { "Content-type": "text/html" });
      const cardsHtml = dataObj
        .map((element) => replaceTemplate(templateCard, element))
        .join("");
      const productsOutput = templateOverview.replace(
        "{%PRODUCT_CARDS%}",
        cardsHtml
      );
      res.end(productsOutput);
      break;
    case "/overview":
      res.end("This is the OVERVIEW");
      break;
    case "/product":
      const product = dataObj[query.id];

      if (!product) error404(res);
      else {
        res.writeHead(200, { "Content-type": "text/html" });
        const productOutput = replaceTemplate(templateProduct, product);
        res.end(productOutput);
      }

      break;
    case "/api":
      fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (error, data) => {
        errorHandler(error);
        // const productData = JSON.parse(data);
        // console.log(productData);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(data);
      });

      break;
    default:
      error404(res);
      break;
  }
};

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
