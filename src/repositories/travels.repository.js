import connection from "../database/database.js";

async function getPassengersTravels(page, name) {
    const offset = page ? (page - 1) * 25 : 0;
    const queryParams = [];
    queryParams.push(offset);

    let query = `
    select p."fullName", COUNT(p) as "viagens"  from passengers as p
    JOIN passenger_travels ON passenger_travels."passengerId" = p.id
    JOIN travels ON travels.id = passenger_travels."travelId"
    `
    if (name) {
        query += `
          WHERE p."fullName" ILIKE $2
        `;
        queryParams.push(`%${name}%`); // ILIKE
    }

    query += `
      GROUP BY p."fullName" 
      ORDER BY "viagens" desc
      LIMIT 25
      OFFSET $1
    `
    const result = await connection.query(query, queryParams);

    return result.rows;
}

export default { getPassengersTravels };

// SELECT p."fullName" as passenger, COALESCE(passenger_travels_count.travels_count, 0) as "travels"
//       FROM passengers p
//       LEFT JOIN (
//         SELECT "passengerId", COUNT(*) AS travels_count
//         FROM passenger_travels
//         GROUP BY "passengerId"
//       ) passenger_travels_count ON p.id = passenger_travels_count."passengerId"
//       ORDER BY travels DESC
//       LIMIT 100
//       OFFSET $1