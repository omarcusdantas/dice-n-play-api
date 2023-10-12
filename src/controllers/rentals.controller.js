import httpStatus from "http-status";
import rentalsService from "../services/rentals.service.js";
import sendErrorResponse from "../errors/sendErrorResponse.js";

async function getAll(req, res) {
    const { customerId, gameId, offset, limit, order, desc, status } = req.query;
    try {
        const rentals = await rentalsService.getAll(res, customerId, gameId, offset, limit, order, desc, status);
        res.writeHead(httpStatus.OK, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(rentals));
    } catch (error) {
        console.log(error);
    }
}

async function create(req, res) {
    const { customerId, gameId, daysRented, today, total } = req.body;
    try {
        await rentalsService.create(res, customerId, gameId, daysRented, today, total);
        res.writeHead(httpStatus.CREATED, { "Content-Type": "text/plain" });
        return res.end("Rental created");
    } catch (error) {
        console.log(error);
    }
}

async function returnById(req, res) {
    const id = Number(req.path.split("/").pop());
    if (isNaN(id) || !id) {
        sendErrorResponse(res, { type: "badRequest", message: "Insert valid Id" });
        return;
    }
    
    try {
        await rentalsService.returnById(res, id);
        res.writeHead(httpStatus.OK, { "Content-Type": "text/plain" });
        return res.end("Rental returned");
    } catch (error) {
        console.log(error);
    }
}

const rentalsController = {
    getAll,
    create,
    returnById,
};
export default rentalsController;
