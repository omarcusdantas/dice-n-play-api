import httpStatus from "http-status";
import gamesRouter from "./games.routes.js";

export default function router(req, res) {
    if (req.path === "/games") {
        gamesRouter(req, res);
    } else {
        res.writeHead(httpStatus.NOT_FOUND, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
}
