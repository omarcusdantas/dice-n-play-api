import httpStatus from "http-status";
import customersRepository from "../respositories/customers.repository.js";

async function getAll(req, res) {
    const { cpf, offset, limit, order, desc } = req.query;

    try {
        const customers = (await customersRepository.findAll(cpf, offset, limit, order, desc)).rows;
        res.writeHead(httpStatus.OK, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(customers));
    } catch (error) {
        console.log(error);
        res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, { "Content-Type": "text/plain" });
        return res.end("Try again later");
    }
}

async function getById(req, res) {
    const id = req.path.split("/").pop();

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

async function create(req, res) {}

const customersController = {
    getAll,
    getById,
    create,
};
export default customersController;
