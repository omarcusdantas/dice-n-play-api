import sendErrorResponse from "../errors/sendErrorResponse.js";
import customersController from "../controllers/customers.controller.js";
import parseBody from "../middlewares/parseBody.js";
import validateSchema from "../middlewares/validateSchema.js";
import { schemaCustomer } from "../schemas/customers.schemas.js";

export default async function customersRouter(req, res) {
    if (req.method === "GET" && req.path === "/customers") {
        customersController.getAll(req, res);
    } else if (req.method === "GET" && req.path.startsWith("/customers/")) {
        customersController.getById(req, res);
    } else if (req.method === "POST" && req.path === "/customers") {
        req.body = await parseBody(req, res);
        await validateSchema(res, req.body, schemaCustomer);
        customersController.create(req, res);
    } else if (req.method === "PUT" && req.path.startsWith("/customers/")) {
        req.body = await parseBody(req);
        await validateSchema(res, req.body, schemaCustomer);
        customersController.update(req, res);
    } else {
        sendErrorResponse(res, { type: "methodNotAllowed" });
    }
}
