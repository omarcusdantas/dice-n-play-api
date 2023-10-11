import customersRepository from "../respositories/customers.repository.js";
import sendErrorResponse from "../errors/sendErrorResponse.js";

async function getAll(res, phone, offset, limit, order, desc) {
    try {
        const customers = await customersRepository.findAll(phone, offset, limit, order, desc);
        return customers.rows;
    } catch (error) {
        console.log(error);
        sendErrorResponse(res);
    }
}

async function getById(res, id) {
    try {
        const customer = await customersRepository.findById(id);
        if (!customer.rows[0]) {
            sendErrorResponse(res, { type: "notFound", message: "Customer not found" });
            return;
        }
        return customer.rows[0];
    } catch (error) {
        console.log(error);
        sendErrorResponse(res);
    }
}

async function create(res, name, phone, birthday) {
    try {
        const foundCustomer = await customersRepository.findByPhone(phone);
        if (foundCustomer.rows[0]) {
            sendErrorResponse(res, { type: "conflict", message: "Phone already registered" });
            return;
        }
        await customersRepository.create(name, phone, birthday);
    } catch (error) {
        console.log(error);
        sendErrorResponse(res);
    }
}

async function updateById(res, id, name, phone, birthday) {
    try {
        const foundCustomer = await customersRepository.findByPhone(phone);
        if (foundCustomer.rows[0] && foundCustomer.rows[0].phone !== id) {
            sendErrorResponse(res, { type: "conflict", message: "Phone already registered" });
            return;
        }
        await customersRepository.updateById(id, name, phone, birthday);
    } catch (error) {
        console.log(error);
        sendErrorResponse(res);
    }
}

const customersService = {
    getAll,
    getById,
    create,
    updateById,
};
export default customersService;
