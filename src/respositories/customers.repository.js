import { db } from "../database/database.connection.js";

async function findAll(cpf, offset, limit, order, desc) {
    let query = `SELECT id, name, phone, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday FROM customers`;
    const queryParams = [];

    if (cpf) {
        query += ` WHERE cpf LIKE $${queryParams.length + 1}`;
        queryParams.push(cpf + "%");
    }

    if (order) {
        query += ` ORDER BY "${order}"`;
        if (desc?.toLowerCase() === "true") {
            query += ` DESC`;
        }
    }

    if (offset) {
        query += ` OFFSET $${queryParams.length + 1}`;
        queryParams.push(offset);
    }

    if (limit) {
        query += ` LIMIT $${queryParams.length + 1}`;
        queryParams.push(limit);
    }

    return db.query(query, queryParams);
}

function findById(id) {
    return db.query("SELECT * FROM customers WHERE id=$1", [id]);
}

const customersRepository = {
    findAll,
    findById,
}
export default customersRepository;
