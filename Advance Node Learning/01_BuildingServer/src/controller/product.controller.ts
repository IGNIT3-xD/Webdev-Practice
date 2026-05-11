import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct, writeProduct } from "../services/product.service";
import type { IPrducts } from "../types/product.type";
import { parseBody } from './../utility/parseBody';
import { sendResponse } from "../utility/sendResponse";

export const productController = async (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

    // Data from database
    let products = readProduct();

    // Dynamic Id
    const urlParts = url?.split('/');
    // console.log(urlParts);
    const id = urlParts ? urlParts[2] : null;
    // console.log(id);

    if (url === '/products' && method === 'GET') {
        try {
            return sendResponse(res, 200, true, "Products Page", products)
        }
        catch (err) {
            return sendResponse(res, 500, false, "Something went wrong..", err)
        }
    }

    else if (urlParts && urlParts[1] === 'products' && id && method === 'GET') {
        const product = products.find((p: IPrducts) => p.id === Number(id));

        if (product) {
            try {
                return sendResponse(res, 200, true, product)
            }
            catch (err) {
                return sendResponse(res, 500, false, "Something went wrong..", err)
            }
        }
        else {
            sendResponse(res, 404, false, "Product Not Found", product)
        }
    }

    else if (url === '/products' && method === 'POST') {
        const body = await parseBody(req)
        // console.log(body);
        // Update data

        const newProduct = {
            id: Date.now(),
            ...body
        }
        // console.log(newProduct);

        products.push(newProduct)
        // console.log(products);
        writeProduct(products)

        try {
            return sendResponse(res, 200, true, newProduct)
        }
        catch (err) {
            return sendResponse(res, 500, false, "Something went wrong..", err)
        }
    }

    else if (urlParts && urlParts[1] === 'products' && id && method === "PUT") {
        const product = products.find((p: IPrducts) => p.id === Number(id))
        // console.log(product);

        const body = await parseBody(req)
        // console.log(body);

        const updatedProduct = { id: product.id, ...body }
        // console.log(product);

        const updatedProducts = products.map((p: IPrducts) => {
            return p.id === Number(id) ? updatedProduct : p
        })

        writeProduct(updatedProducts)

        try {
            sendResponse(res, 200, true, "Put successfully", updatedProduct)
        }
        catch (err) {
            return sendResponse(res, 500, false, "Something went wrong..", err)
        }

        // res.writeHead(200, { "content-type": "application/json" })
        // res.end(JSON.stringify({
        //     message: "Put sucessfully",
        //     data: updatedProducts
        // }))
    }

    else if (urlParts && urlParts[1] === 'products' && id && method === 'DELETE') {
        const deleteProducts = products.filter((p: IPrducts) => p.id !== Number(id))
        // console.log(deleteProducts);

        writeProduct(deleteProducts)

        try {
            return sendResponse(res, 200, true, "Delete sucessfully", deleteProducts)
        }
        catch (err) {
            return sendResponse(res, 500, false, "Something went wrong..", err)
        }
    }
}