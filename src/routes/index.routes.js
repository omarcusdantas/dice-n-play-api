import httpStatus from "http-status";
import gamesRouter from "./games.routes.js";
import customersRouter from "./customers.routes.js";

export default function router(req, res) {
    if (req.path.startsWith("/games")) {
        gamesRouter(req, res);
    } else if (req.path.startsWith("/customers")) {
        customersRouter(req, res);
    } else {
        res.writeHead(httpStatus.NOT_FOUND, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
}
