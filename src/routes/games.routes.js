import sendErrorResponse from "../errors/sendErrorResponse.js";
import gamesController from "../controllers/games.controller.js";
import parseBody from "../middlewares/parseBody.js";
import validateSchema from "../middlewares/validateSchema.js";
import { schemaGame } from "../schemas/games.schemas.js";

export default async function gamesRouter(req, res) {
    if (req.method === "GET" && req.path === "/games") {
        console.log("oi")
        gamesController.getAll(req, res);
    } else if (req.method === "POST" && req.path === "/games") {
        req.body = await parseBody(req);
        await validateSchema(res, req.body, schemaGame);
        gamesController.create(req, res);
    } else {
        sendErrorResponse(res, { type: "methodNotAllowed" });
    }
}
