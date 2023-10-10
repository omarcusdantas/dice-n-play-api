import httpStatus from "http-status";
import { schemaGame } from "../schemas/games.schemas.js";
import gamesRepository from "../respositories/games.repository.js";

async function getAll(req, res) {
    const { name, offset, limit, order, desc } = req.query;

    try {
        const games = (await gamesRepository.findAll(name, offset, limit, order, desc)).rows;
        res.writeHead(httpStatus.OK, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(games));
    } catch (error) {
        console.log(error);
        res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, { "Content-Type": "text/plain" });
        return res.end("Try again later");
    }
}

async function create(req, res) {
    const validateBody = schemaGame.validate(req.body, { abortEarly: false });
    if (validateBody.error) {
        res.writeHead(httpStatus.UNPROCESSABLE_ENTITY, { "Content-Type": "text/plain" });
        return res.end(validateBody.error.details.map((detail) => detail.message).join("\n"));
    }
    const { name, stock, pricePerDay } = req.body;

    try {
        const foundGame = (await gamesRepository.findByName(name)).rows[0];
        if (foundGame) {
            res.writeHead(httpStatus.CONFLICT, { "Content-Type": "text/plain" });
            return res.end("Game already regitered");
        }

        await gamesRepository.create(name, stock, pricePerDay);
        res.writeHead(httpStatus.CREATED, { "Content-Type": "text/plain" });
        return res.end("Game created");
    } catch (error) {
        console.log(error);
        res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, { "Content-Type": "text/plain" });
        return res.end("Try again later");
    }
}

const gamesController = { 
    getAll,
    create,
};
export default gamesController;
