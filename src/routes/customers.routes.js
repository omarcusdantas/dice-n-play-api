import httpStatus from "http-status";
import customersController from "../controllers/customers.controller.js";
import parseBody from "../middlewares/parseBody.js";

export default async function customersRouter(req, res) {
    if (req.method === "GET" && req.path === "/customers") {
        customersController.getAll(req, res);
    } else if (req.method === "GET" && req.path.startsWith("/customers/")) {
        customersController.getById(req, res);
    } else if (req.method === "POST") {
        try {
            req.body = await parseBody(req);
            customersController.create(req, res);
        } catch (error) {
            res.writeHead(httpStatus.UNPROCESSABLE_ENTITY, { "Content-Type": "text/plain" });
            res.end("Body is not a valid JSON");   
        }
    } else if (req.method === "PUT" && req.path.startsWith("/customers/")){
        try {
            req.body = await parseBody(req);
            customersController.update(req, res);
        } catch (error) {
            res.writeHead(httpStatus.UNPROCESSABLE_ENTITY, { "Content-Type": "text/plain" });
            res.end("Body is not a valid JSON");   
        }
    } else {
        res.writeHead(httpStatus.METHOD_NOT_ALLOWED, { "Content-Type": "text/plain" });
        res.end("Method Not Allowed");
    }
}
