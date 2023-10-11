import { db } from "../database/database.connection.js";

async function findAll(phone, offset, limit, order, desc) {
    let query = `SELECT id, name, phone, TO_CHAR(birthday, 'DD-MM-YYYY') AS birthday FROM customers`;
    const queryParams = [];

    if (phone) {
        query += ` WHERE phone LIKE $${queryParams.length + 1}`;
        queryParams.push(phone + "%");
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
    return db.query("SELECT id, name, phone, TO_CHAR(birthday, 'DD-MM-YYYY') AS birthday FROM customers WHERE id=$1", [
        id,
    ]);
}

function findByPhone(phone) {
    return db.query(
        "SELECT id, name, phone, TO_CHAR(birthday, 'DD-MM-YYYY') AS birthday FROM customers WHERE phone=$1",
        [phone]
    );
}

function create(name, phone, birthday) {
    return db.query("INSERT INTO customers (name, phone, birthday) VALUES ($1, $2, to_date($3, 'DD-MM-YYYY'));", [
        name,
        phone,
        birthday,
    ]);
}

function updateById(id, name, phone, birthday) {
    return db.query("UPDATE customers SET name=$1, phone=$2, birthday=to_date($3, 'DD-MM-YYYY') WHERE id=$4;", [
        name,
        phone,
        birthday,
        id,
    ]);
}

const customersRepository = {
    findAll,
    findById,
    findByPhone,
    create,
    updateById,
};
export default customersRepository;
