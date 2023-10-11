import httpStatus from "http-status";
import sendErrorResponse from "../errors/sendErrorResponse.js";
import customersService from "../services/customers.service.js";

async function getAll(req, res) {
    const { phone, offset, limit, order, desc } = req.query;

    try {
        const customers = await customersService.getAll(res, phone, offset, limit, order, desc);
        res.writeHead(httpStatus.OK, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(customers));
    } catch (error) {
        console.log(error);
    }
}

async function getById(req, res) {
    const id = Number(req.path.split("/").pop());
    if (isNaN(id) || !id) {
        sendErrorResponse(res, { type: "badRequest", message: "Insert valid Id" });
        return;
    }

    try {
        const customer = await customersService.getdById(res, id);
        res.writeHead(httpStatus.OK, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(customer));
    } catch (error) {
        console.log(error);
    }
}

async function create(req, res) {
    const { name, phone, birthday } = req.body;
    try {
        await customersService.create(res, name, phone, birthday);
        res.writeHead(httpStatus.CREATED, { "Content-Type": "text/plain" });
        res.end("Customer created");
    } catch (error) {
        console.log(error);
    }
}

async function update(req, res) {
    const id = Number(req.path.split("/").pop());
    if (isNaN(id) || !id) {
        sendErrorResponse(res, { type: "badRequest", message: "Insert valid Id" });
        return;
    }

    const { name, phone, birthday } = req.body;
    try {
        await customersService.updateById(res, id, name, phone, birthday);
        res.writeHead(httpStatus.OK, { "Content-Type": "text/plain" });
        return res.end("Customer updated");
    } catch (error) {
        console.log(error);
    }
}

const customersController = {
    getAll,
    getById,
    create,
    update,
};
export default customersController;
