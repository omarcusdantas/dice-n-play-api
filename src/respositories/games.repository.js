import { db } from "../database/database.connection.js";

async function getByName(name) {
    const response = await db.query("SELECT * FROM games WHERE name=$1", [name]);
    return response.rows[0];
}

async function create(name, stockTotal, pricePerDay) {
    return db.query("INSERT INTO games (name, stock, price_per_day) VALUES ($1, $2, $3);", [
        name,
        stockTotal,
        pricePerDay,
    ]);
}

const gamesRepository = { getByName, create };
export default gamesRepository;
