import httpStatus from "http-status";
import gamesController from "../controllers/games.controller.js";
import parseBody from "../middlewares/parseBody.js";

export default async function gamesRouter(req, res) {
    if (req.method === "GET") {
        return;
    } else if (req.method === "POST") {
        try {
            req.body = await parseBody(req);
            gamesController.create(req, res);
        } catch (error) {
            res.writeHead(httpStatus.UNPROCESSABLE_ENTITY, { "Content-Type": "text/plain" });
            res.end("Body is not a valid JSON");   
        }
    } else {
        res.writeHead(httpStatus.METHOD_NOT_ALLOWED, { "Content-Type": "text/plain" });
        res.end("Method Not Allowed");
    }
}
