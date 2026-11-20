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
    const [rows] = await Db.query("SELECT * FROM films WHERE fi_id = ?", [id]);
    return rows[0];
}

async function getScreenings(id) {
    const [rows] = await Db.query("SELECT sc_id, sc_datetime, sc_price,ro_name FROM screenings JOIN rooms ON sc_room = ro_id WHERE sc_film = ? AND sc_datetime > NOW()", [id]);
    return rows;
}

async function create(film) {
    const [created] = await Db.query("INSERT INTO films(fi_title, fi_description, fi_duration, fi_genre, fi_release_date, fi_is_showing) VALUES (?,?,?,?,?,?)",
        [film.title, film.description, film.duration, film.genre, film.release_date, film.is_showing]);
    return created;
}

async function update(id, film) {
    const [updated] = await Db.query("UPDATE films SET fi_title = ?, fi_description = ?, fi_duration = ?, fi_genre = ?, fi_release_date = ?, fi_is_showing = ? WHERE fi_id = ?", [film.title, film.description, film.duration, film.genre, film.release_date, film.is_showing, id]);
    return updated;
}




export default {
    getAll,
    getShowing,
    getById,
    getScreenings,
    create,
    update
}