import httpStatus from "http-status";
import gamesRepository from "../respositories/games.repository.js";

async function getAll(req, res) {
    const { name, offset, limit, order, desc } = req.query;
    try {
        const games = await gamesRepository.findAll(name, offset, limit, order, desc);
        res.writeHead(httpStatus.OK, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(games));
    } catch (error) {
        console.log(error);
    }
}

async function create(req, res) {
    const { name, stock, pricePerDay } = req.body;
    try {
        await gamesRepository.create(name, stock, pricePerDay);
        res.writeHead(httpStatus.CREATED, { "Content-Type": "text/plain" });
        return res.end("Game inserted");
    } catch (error) {
        console.log(error);
    }
}

const gamesController = {
    getAll,
    create,
};
export default gamesController;
