import type { IncomingMessage, ServerResponse } from "node:http";
import { productController } from "../controller/product.controller";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

    if (url === "/" && method === "GET") {
        // console.log("Home Page");
        res.writeHead(200, { "content-type": "text/plain" });
        res.end("Home Page");
    }

    else if(url?.startsWith("/products")) {
        productController(req, res);
    }

    else {
        // console.log("Not Found");
        res.writeHead(404, { "content-type": "text/html" });
        res.end("<h2 style='color: red; text-align: center;'>404 - Not Found</h2>");
    }
}