//moduels http ,url,fs
const http = require("http");
const url = require("url");
const fs = require("fs");
const slugify = require("slugify");

//export replaceTemplate moduels
const replaceTemplate = require("./modules/replaceTemplate");
//FILES
//we mak sync beacyse we in the top level of the program and we executed once
//we dont put it on the createServer function beacuse it will relod each time
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/templates-overview.html`,
  "utf-8"
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/templates-card.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/templates-product.html`,
  "utf-8"
);

const data = fs.readFileSync("./data.json", "utf-8");
const objData = JSON.parse(data);

const slugs = objData.map((el) => slugify(el.productName, { lower: true })); // Assuming 'productName' contains the string you want to slugify
console.log(slugs);

//SERVER
const Server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //overview page

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = objData.map((el) => replaceTemplate(templateCard, el)); // Corrected 'temp' to 'templateCard'
    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  }

  //Product page

  // Inside the '/product' route handler
  // Inside the '/product' route handler
  else if (pathname === "/product") {
    const productId = +query.id; // Convert query.id to a number
    const product = objData.find((el) => el.id === productId);
    if (product) {
      res.writeHead(200, { "Content-type": "text/html" });
      // Use the replaceTemplate function to replace placeholders with product data
      const output = replaceTemplate(templateProduct, product);
      res.end(output);
    } else {
      res.writeHead(404, { "Content-type": "text/html" });
      res.end("<h1>Product not found!</h1>");
    }
  }

  //API PAGE
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  }

  // NOT FOUND
  else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found! </h1>");
  }
});
Server.listen(3000, () => {
  console.log("listing to port 3000");
});
