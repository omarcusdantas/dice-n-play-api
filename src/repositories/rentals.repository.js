import { db } from "../database/database.connection.js";

function findAll(customerId, gameId, offset, limit, order, desc, status, startDate) {
    let query = `
        SELECT 
            r.id AS "id",
            r.customer_id AS "customerId",
            r.game_id AS "gameId", 
            r.days_rented AS "daysRented", 
            r.rent_date AS "rentDate", 
            r.original_price AS "originalPrice", 
            r.return_date AS "returnDate", 
            r.delay_fee AS "delayFee", 
            customers.name AS "customerName", 
            games.name AS "gameName" 
        FROM rentals r
        INNER JOIN customers ON r.customer_id = customers.id 
        INNER JOIN games ON r.game_id = games.id
    `;
    const queryParams = [];

    if (customerId) {
        query += ` WHERE rentals.customer_id = $${queryParams.length + 1}`;
        queryParams.push(customerId);
    }

    if (gameId) {
        query += query.includes("WHERE") ? " AND " : " WHERE ";
        query += `rentals.game_id = $${queryParams.length + 1}`;
        queryParams.push(gameId);
    }

    if (status) {
        const filter = status === "open" ? "rentals.return_date IS NULL" : "rentals.return_date IS NOT NULL";
        query += query.includes("WHERE") ? " AND " : " WHERE ";
        query += filter;
    }

    if (startDate) {
        query += query.includes("WHERE") ? " AND " : " WHERE ";
        query += `rentals.rent_date >= $${queryParams.length + 1}`;
        queryParams.push(startDate);
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

async function findById(id) {
    return db.query(
        `
        SELECT 
            id AS "id",
            customer_id AS "customerId", 
            game_id AS "gameId", 
            days_rented AS "daysRented", 
            rent_date AS "rentDate", 
            original_price AS "originalPrice", 
            return_date AS "returnDate", 
            delay_fee AS "delayFee" 
        FROM rentals 
        WHERE id=$1`,
        [id]
    );
}

async function getNotCompletedRentalsByGameId(gameId) {
    return db.query(`
        SELECT 
            id AS "id",
            customer_id AS "customerId", 
            game_id AS "gameId", 
            days_rented AS "daysRented", 
            rent_date AS "rentDate", 
            original_price AS "originalPrice", 
            return_date AS "returnDate", 
            delay_fee AS "delayFee" 
        FROM rentals 
        WHERE game_id=$1 AND return_date IS NULL`,
        [gameId]
    );
}

async function create(customerId, gameId, daysRented, today, total) {
    return db.query(
        `INSERT INTO rentals 
        (customer_id, game_id, days_rented, rent_date, original_price, return_date, delay_fee) 
        VALUES ($1, $2, $3, to_date($4, 'DD-MM-YYYY'), $5, null, null)`,
        [customerId, gameId, daysRented, today, total]
    );
}

async function updateById(id, today, delayFee) {
    return db.query("UPDATE rentals SET return_date=to_date($1, 'DD-MM-YYYY'), delay_fee=$2 WHERE id=$3;", [today, delayFee, id]);
}

const rentalsRepository = {
    findAll,
    findById,
    getNotCompletedRentalsByGameId,
    create,
    updateById,
};
export default rentalsRepository;
