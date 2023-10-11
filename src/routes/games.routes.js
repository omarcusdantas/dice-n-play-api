import httpStatus from "http-status";
import gamesController from "../controllers/games.controller.js";
import parseBody from "../middlewares/parseBody.js";
import validateSchema from "../middlewares/validateSchema.js";
import { schemaGame } from "../schemas/games.schemas.js";

export default async function gamesRouter(req, res) {
    if (req.method === "GET") {
        gamesController.getAll(req, res);
    } else if (req.method === "POST") {
        req.body = await parseBody(req);
        await validateSchema(res, req.body, schemaGame);
        gamesController.create(req, res);
    } else {
        res.writeHead(httpStatus.METHOD_NOT_ALLOWED, { "Content-Type": "text/plain" });
        res.end("Method Not Allowed");
    }
}
