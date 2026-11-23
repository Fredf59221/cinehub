import screeningsModel from "../Models/screenings.model.js";

async function getAll(req, res) {
    try {
       const screenings = await screeningsModel.getAll();
       res.status(200).json(screenings); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de la récupération des séances" });
        
    }

}



async function getById(req, res) {
    const id = req.params.id;
    try {
       const screening = await screeningsModel.getById(id);
       if (!screening) {
            return res.status(404).json({ error: "Séance introuvable" });
       }
       
       res.status(200).json(screening);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de la récupération de la séance" });
    }
}
async function getByFilm(req, res) {
    const filmId = req.params.filmId;
    try {
       const screenings = await screeningsModel.getByFilm(filmId); 
       res.status(200).json(screenings);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de la récupération des séances du film" });
    }
}
async function create(req, res) {
    const film = req.body.film;
    const room = req.body.room;
    const datetime = req.body.datetime;
    const price = req.body.price;
    if (!film || !room || !datetime || !price) {
        return res.status(403).json({ error: "Champs manquants" });
    }
    try {
        const result = await screeningsModel.create({ film: film, room: room, datetime: datetime, price: price });
        res.status(201).json(result);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "erreur lors de la création de la séance" });

    }
}

async function update(req, res) {
    const id = req.params.id;
    try {
        const screening= await screeningsModel.getById(id);
        if (!screening) {
            return res.status(404).json({ error: "Séance introuvable" });
        }
        let film = screening.sc_film;
        if (req.body.film !== undefined) {
            film = req.body.film;
        }
        let room = screening.sc_room;
        if (req.body.room !== undefined) {
            room = req.body.room;
        }
        let datetime = screening.sc_datetime;
        if (req.body.datetime !== undefined) {
            datetime = req.body.datetime;
        }
        let price = screening.sc_price;
        if (req.body.price!== undefined) {
            price = req.body.price;
        }

        await screeningsModel.update(id, { film: film, room: room, datetime: datetime, price: price });
        const updatedScreening = await screeningsModel.getById(id);
        res.status(200).json({ message: "Séance modifiée", screening: updatedScreening });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de la modification de la séance" });
    }
}
async function remove (req, res) {
    const id = req.params.id;
    try {
        const screening = await screeningsModel.getById(id);
        if (!screening) {
            return res.status(404).json({ error: "Séancee introuvable" });
        } 
        await screeningsModel.remove(id);
        res.status(200).json({message: "Séance supprimée"}); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de la suppression de la séance" });
    }
}






export default {
    getAll,
    getById,
    create,
    update,
    remove,
    getByFilm
}