import roomsModel from "../Models/rooms.model.js";

async function getAll(req, res) {
    try {
       const rooms = await roomsModel.getAll();
       res.status(200).json(rooms); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de la récupération des salles" });
        
    }

}



async function getById(req, res) {
    const id = req.params.id;
    try {
       const room = await roomsModel.getById(id);
       if (!room) {
            return res.status(404).json({ error: "Salle introuvable" });
       }
       
       res.status(200).json(room);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de la récupération de la salle" });
    }
}
async function create(req, res) {
    const name = req.body.name;
    const capacity = req.body.capacity;
    if (!name || !capacity) {
        return res.status(403).json({ error: "Champs manquants" });
    }
    try {
        const result = await roomsModel.create({ name: name, capacity: capacity});
        res.status(201).json(result);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "erreur lors de la création de la salle" });

    }
}

async function update(req, res) {
    const id = req.params.id;
    try {
        const room = await roomsModel.getById(id);
        if (!room) {
            return res.status(404).json({ error: "Salle introuvable" });
        }
        let name = room.ro_name;
        if (req.body.name !== undefined) {
            name = req.body.name;
        }
        let capacity = room.ro_capacity;
        if (req.body.capacity !== undefined) {
            capacity = req.body.capacity;
        }
        await roomsModel.update(id, { name: name, capacity: capacity });
        const updatedRoom = await roomsModel.getById(id);
        res.status(200).json({ message: "Salle modifiée", room: updatedRoom });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de la modification de la salle" });
    }
}
async function remove (req, res) {
    const id = req.params.id;
    try {
        const room = await roomsModel.getById(id);
        if (!room) {
            return res.status(404).json({ error: "Salle introuvable" });
        } 
        await roomsModel.remove(id);
        res.status(200).json({message: "Salle supprimée"}); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de la suppression de la salle" });
    }
}






export default {
    getAll,
    getById,
    create,
    update,
    remove
}