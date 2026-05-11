import { createServer, IncomingMessage, Server } from "node:http";
import { routeHandler } from "./routes/route";

const server: Server = createServer((req: IncomingMessage, res) => {
    // console.log(req);
    // console.log(req.url);
    // console.log(req.method);

    routeHandler(req, res);
});

server.listen(3000, () => {
    console.log("Server is running on port 3000...");
});