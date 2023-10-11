import sendErrorResponse from "../errors/sendErrorResponse.js";
import rentalsController from "../controllers/rentals.controller.js";
import parseBody from "../middlewares/parseBody.js";
import validateSchema from "../middlewares/validateSchema.js";
import { schemaRental } from "../schemas/rentals.schemas.js";

export default async function rentalsRouter(req, res) {
    if (req.method === "GET" && req.path === "/rentals") {
        rentalsController.getAll(req, res);
    } else if (req.method === "POST") {
        req.body = await parseBody(req, res);
        await validateSchema(res, req.body, schemaRental);
        rentalsController.create(req, res);
    } else if (req.method === "PUT" && req.path.startsWith("/rentals/return/")) {
        req.body = await parseBody(req);
        await validateSchema(res, req.body, schemaCustomer);
        rentalsController.returnById(req, res);
    } else {
        sendErrorResponse(res, { type: "methodNotAllowed" });
    }
}
