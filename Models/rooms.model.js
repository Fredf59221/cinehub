import Db from '../Config/db.js';

async function getAll() {
    const [rows] = await Db.query("SELECT * FROM rooms");
    return rows;
}



async function getById(id) {
    const [rows] = await Db.query("SELECT * FROM rooms WHERE ro_id = ?", [id]);
    return rows[0];
}



async function create(room) {
    const [created] = await Db.query("INSERT INTO rooms(ro_name, ro_capacity) VALUES (?,?)",
        [room.name, room.capacity]);
    return created;
}

async function update(id, room) {
    const [updated] = await Db.query("UPDATE rooms SET ro_name = ?, ro_capacity= ? WHERE ro_id = ?", [room.name, room.capacity, id]);
    return updated;
}
async function remove(id) {
    const [deleted] = await Db.query("DELETE FROM rooms WHERE ro_id = ?", [id]);
    return deleted;

}




export default {
    getAll,
    getById,
    create,
    update,
    remove
}