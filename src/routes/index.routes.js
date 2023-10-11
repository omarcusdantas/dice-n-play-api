import rentalsRouter from "./rentals.routes.js";
import gamesRouter from "./games.routes.js";
import customersRouter from "./customers.routes.js";
import sendErrorResponse from "../errors/sendErrorResponse.js";

export default function router(req, res) {
    if (req.path.startsWith("/games")) {
        gamesRouter(req, res);
    } else if (req.path.startsWith("/customers")) {
        customersRouter(req, res);
    } else if (req.path.startsWith("/rentals")) {
        rentalsRouter(req, res);
    } else {
        sendErrorResponse(res, { type: "notFound", message: "Route not found" });
    }
}
