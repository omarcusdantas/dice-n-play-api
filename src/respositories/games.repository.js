import { db } from "../database/database.connection.js";

function findAll(name, offset, limit, order, desc) {
    let query = `SELECT * FROM games`;
    const queryParams = [];

    if (name) {
        query += ` WHERE LOWER(name) LIKE $${queryParams.length + 1}`;
        queryParams.push(name.toLowerCase() + "%");
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

function findByName(name) {
    return db.query("SELECT * FROM games WHERE name=$1", [name]);
}

function create(name, stockTotal, pricePerDay) {
    return db.query("INSERT INTO games (name, stock, price_per_day) VALUES ($1, $2, $3);", [
        name,
        stockTotal,
        pricePerDay,
    ]);
}

const gamesRepository = {
    findAll,
    findByName,
    create,
};
export default gamesRepository;
