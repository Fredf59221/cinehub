import Db from '../Config/db.js';

async function getAll() {
    const [rows] = await Db.query("SELECT * FROM films");
    return rows;
}

async function getShowing() {
    const [rows] = await Db.query("SELECT * FROM films WHERE fi_is_showing = 1");
    return rows;
}

async function getById(id) {
    const [rows] = await Db.query("SELECT * FROM films WHERE fi_id = ?",[id]);
    return rows[0];
}

async function getScreenings(id) {
    const [rows] = await Db.query("SELECT sc_id, sc_datetime, sc_price,ro_name FROM screenings JOIN rooms ON sc_room = ro_id WHERE sc_film = ? AND sc_datetime > NOW()", [id]);
    return rows;
}

export default {
    getAll,
    getShowing,
    getById,
    getScreenings
}