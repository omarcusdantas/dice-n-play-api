import dayjs from "dayjs";
import rentalsRepository from "../repositories/rentals.repository.js";
import customersRepository from "../repositories/customers.repository.js";
import gamesRepository from "../repositories/games.repository.js";
import sendErrorResponse from "../errors/sendErrorResponse.js";

async function getAll(res, customerId, gameId, offset, limit, order, desc) {
    try {
        const rentals = await rentalsRepository.findAll(customerId, gameId, offset, limit, order, desc);

        const formattedRentals = rentals.rows.map((rental) => {
            const formattedRental = {
                ...rental,
                returnDate: rental.returnDate ? dayjs(rental.returnDate).format("DD-MM-YYYY") : null,
                rentDate: dayjs(rental.rentDate).format("DD-MM-YYYY"),
                customer: {
                    id: rental.customerId,
                    name: rental.customerName,
                },
                game: {
                    id: rental.gameId,
                    name: rental.gameName,
                },
            };
            delete formattedRental.gameName;
            delete formattedRental.customerName;
            return formattedRental;
        });
        return formattedRentals;
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, { type: "serverError" });
    }
}

async function create(res, customerId, gameId, daysRented) {
    try {
        const customer = await customersRepository.findById(customerId);
        if (!customer.rows[0]) {
            sendErrorResponse(res, { type: "badRequest", message: "Invalid customer" });
            return;
        }

        const game = await gamesRepository.findById(gameId);
        if (!game.rows[0]) {
            sendErrorResponse(res, { type: "badRequest", message: "Invalid game" });
            return;
        }

        const gameRentals = await rentalsRepository.getNotCompletedRentalsByGameId(gameId);
        if (gameRentals.rowCount >= game.rows[0].stock) {
            sendErrorResponse(res, { type: "badRequest", message: "Game is not available" });
            return;
        }

        const today = dayjs().format("DD-MM-YYYY");
        const total = daysRented * game.rows[0].pricePerDay;
        await rentalsRepository.create(customerId, gameId, daysRented, today, total);
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, { type: "serverError" });
    }
}

async function returnById(res, id) {
    try {
        const rental = await rentalsRepository.findById(id);
        if (!rental.rows[0]) {
            sendErrorResponse(res, { type: "notFound", message: "Rental not found" });
            return;
        }

        if (rental.rows[0].returnDate) {
            sendErrorResponse(res, { type: "badRequest", message: "Rental already returned" });
            return;
        }

        const { rentDate, originalPrice, daysRented } = rental.rows[0];
        const daysPassed = dayjs().diff(dayjs(rentDate), "days");
        const pricePerDay = originalPrice / daysRented;
        const delayFee = daysPassed > daysRented ? pricePerDay * (daysPassed - daysRented) : null;
        const today = dayjs().format("DD-MM-YYYY");

        await rentalsRepository.updateById(id, today, delayFee);
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, { type: "serverError" });
    }
}

const rentalsService = {
    getAll,
    create,
    returnById,
};
export default rentalsService;
