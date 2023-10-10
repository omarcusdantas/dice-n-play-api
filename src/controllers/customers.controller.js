import httpStatus from "http-status";
import { schemaCustomer } from "../schemas/customers.schemas.js";
import customersRepository from "../respositories/customers.repository.js";
import { c } from "tar";

async function getAll(req, res) {
    const { phone, offset, limit, order, desc } = req.query;

    try {
        const customers = (await customersRepository.findAll(phone, offset, limit, order, desc)).rows;
        res.writeHead(httpStatus.OK, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(customers));
    } catch (error) {
        console.log(error);
        res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, { "Content-Type": "text/plain" });
        return res.end("Try again later");
    }
}

async function getById(req, res) {
    const id = Number(req.path.split("/").pop());
    if (isNaN(id) || !id) {
        res.writeHead(httpStatus.BAD_REQUEST, { "Content-Type": "text/plain" });
        return res.end("Insert valid Id");
    }

    try {
        const customer = (await customersRepository.findById(id)).rows[0];
        if (!customer) {
            res.writeHead(httpStatus.NOT_FOUND, { "Content-Type": "text/plain" });
            return res.end("Customer not found");
        }

        res.writeHead(httpStatus.OK, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(customer));
    } catch (error) {
        console.log(error);
        res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, { "Content-Type": "text/plain" });
        return res.end("Try again later");
    }
}

async function create(req, res) {
    const validateBody = schemaCustomer.validate(req.body, { abortEarly: false });
    if (validateBody.error) {
        res.writeHead(httpStatus.UNPROCESSABLE_ENTITY, { "Content-Type": "text/plain" });
        return res.end(validateBody.error.details.map((detail) => detail.message).join("\n"));
    }

    const { name, phone, birthday } = req.body;

    try {
        const foundCustomer = (await customersRepository.findByPhone(phone)).rows[0];
        if (foundCustomer) {
            res.writeHead(httpStatus.CONFLICT, { "Content-Type": "text/plain" });
            return res.end("Phone already registered");
        }

        await customersRepository.create(name, phone, birthday);
        res.writeHead(httpStatus.CREATED, { "Content-Type": "text/plain" });
        return res.end("Customer created");
    } catch (error) {
        console.log(error);
        res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, { "Content-Type": "text/plain" });
        return res.end("Try again later");
    }
}

async function update(req, res) {
    const id = Number(req.path.split("/").pop());
    if (isNaN(id) || !id) {
        res.writeHead(httpStatus.BAD_REQUEST, { "Content-Type": "text/plain" });
        return res.end("Insert valid Id");
    }

    const { name, phone, birthday } = req.body;

    try {
        const foundCustomer = (await customersRepository.findByPhone(phone)).rows[0];
        if (foundCustomer && foundCustomer.phone !== id) {
            res.writeHead(httpStatus.CONFLICT, { "Content-Type": "text/plain" });
            return res.end("Phone already regitered");
        }

        await customersRepository.updateById(id, name, phone, birthday);
        res.writeHead(httpStatus.OK, { "Content-Type": "text/plain" });
        return res.end("Customer updated");
    } catch (error) {
        console.log(error);
        res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, { "Content-Type": "text/plain" });
        return res.end("Try again later");
    }
}

const customersController = {
    getAll,
    getById,
    create,
    update,
};
export default customersController;
