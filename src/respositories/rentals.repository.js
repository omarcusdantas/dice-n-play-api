function getAll(customerId, gameId, offset, limit, order, desc, status, startDate) {
    let query = `
        SELECT 
            customer_id AS "customerId",
            game_id AS "gameId", 
            days_rented AS "daysRented", 
            rent_date AS "rentDate", 
            original_price AS "originalPrice", 
            return_date AS "returnDate", 
            delay_fee AS "delayFee" 
            customers.name AS "customerName", 
            games.name AS "gameName" 
        FROM rentals 
        INNER JOIN customers ON rentals.customer_id = customers.id 
        INNER JOIN games ON rentals.game_id = games.id
    `;
    const queryParams = [];

    if (customerId) {
        query += ` WHERE rentals.customer_id = $${queryParams.length + 1}`;
        queryParams.push(customerId);
    }

    if (gameId) {
        query += query.includes("WHERE") ? " AND " : " WHERE ";
        query += `rentals."gameId" = $${queryParams.length + 1}`;
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

async function getById(id) {
    return db.query(
        `
        SELECT 
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

async function create(customerId, gameId, daysRented, today, total) {
    return db.query(
        `INSERT INTO rentals 
        (customer_id, game_id, days_rented, rent_date, original_price, return_date, delay_fee) 
        VALUES ($1, $2, $3, $4, $5, null, null)`,
        [customerId, gameId, daysRented, today, total]
    );
}

async function deleteById(id) {
    return db.query("DELETE FROM rentals WHERE id=$1", [id]);
}

async function updateById(id, today, delayFee) {
    return db.query("UPDATE rentals SET return_date=$1, delay_fee=$2 WHERE id=$3;", [today, delayFee, id]);
}
