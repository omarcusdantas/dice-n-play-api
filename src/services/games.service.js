import gamesRepository from "../respositories/games.repository.js";
import sendErrorResponse from "../errors/sendErrorResponse.js";

async function getAll(res, name, offset, limit, order, desc) {
    try {
        const games = await gamesRepository.findAll(name, offset, limit, order, desc);
        return games.rows;
    } catch (error) {
        sendErrorResponse(res, { type: "serverError" });
    }
}

async function create(res, name, stock, pricePerDay) {
    try {
        const foundGame = await gamesRepository.findByName(name);
        if (foundGame.rows[0]) {
            sendErrorResponse(res, { type: "conflict", message: "Game already registered" });
            return;
        }
        await gamesRepository.create(name, stock, pricePerDay);
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, { type: "serverError" });
    }
}

const gamesService = {
    getAll,
    create,
};
export default gamesService;
