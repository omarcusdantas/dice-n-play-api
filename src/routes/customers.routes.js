import httpStatus from "http-status";
import customersController from "../controllers/customers.controller.js";
import parseBody from "../middlewares/parseBody.js";
import validateSchema from "../middlewares/validateSchema.js";
import { schemaCustomer } from "../schemas/customers.schemas.js";

export default async function customersRouter(req, res) {
    if (req.method === "GET" && req.path === "/customers") {
        customersController.getAll(req, res);
    } else if (req.method === "GET" && req.path.startsWith("/customers/")) {
        customersController.getById(req, res);
    } else if (req.method === "POST") {
        req.body = await parseBody(req, res);
        await validateSchema(res, req.body, schemaCustomer);
        customersController.create(req, res);
    } else if (req.method === "PUT" && req.path.startsWith("/customers/")) {
        req.body = await parseBody(req);
        await validateSchema(res, req.body, schemaCustomer);
        customersController.update(req, res);
    } else {
        res.writeHead(httpStatus.METHOD_NOT_ALLOWED, { "Content-Type": "text/plain" });
        res.end("Method Not Allowed");
    }
}
