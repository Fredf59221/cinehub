import Db from '../Config/db.js';

async function getAll() {
    const [rows] = await Db.query("SELECT sc_id, sc_datetime, sc_price, fi_title, ro_name FROM screenings JOIN films ON sc_film = fi_id JOIN rooms ON sc_room = ro_id");
    return rows;
}
async function getByFilm(filmId) {
    const [rows] = await Db.query("SELECT sc_id, sc_datetime, sc_price, fi_title, ro_name FROM screenings JOIN films ON sc_film = fi_id JOIN rooms ON sc_room = ro_id WHERE sc_film = ?", [filmId]);
    return rows;
}
async function getById(id) {
    const [rows] = await Db.query("SELECT * FROM screenings WHERE sc_id = ?", [id]);
    return rows[0];
}
async function create(screening) {
    const [created] = await Db.query("INSERT INTO screenings(sc_film, sc_room, sc_datetime, sc_price) VALUES (?,?,?,?)",
        [screening.film, screening.room, screening.datetime, screening.price]);
    return created;
}
async function update(id, screening) {
    const [updated] = await Db.query("UPDATE screenings SET sc_film = ?, sc_room = ?, sc_datetime = ?, sc_price =? WHERE sc_id = ?", [screening.film, screening.room, screening.datetime, screening.price, id]);
    return updated;
}
async function remove(id) {
    const [deleted] = await Db.query("DELETE FROM screenings WHERE sc_id = ?", [id]);
    return deleted;

}


export default {
    getAll,
    getByFilm,
    getById,
    create,
    update,
    remove
}