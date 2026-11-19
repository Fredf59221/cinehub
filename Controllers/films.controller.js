import filmsModel from "../Models/films.model.js";

async function getAll(req, res) {
    try {
       const films = await filmsModel.getAll();
       res.status(200).json(films); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de la récupération des films" });
        
    }

}

async function getShowing(req, res) {
    try {
       const films = await filmsModel.getShowing();
       res.status(200).json(films); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de la récupération des films à l'affiche" });
        
    }

}

async function getById(req, res) {
    const id = req.params.id;
    try {
       const film = await filmsModel.getById(id);
       if (!film) {
            return res.status(404).json({ error: "Film introuvable" });
       }
       const screenings = await filmsModel.getScreenings(id);
       res.status(200).json({ film: film, screenings: screenings });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de la récupération du film" });
    }
}
async function create(req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const duration = req.body.duration;
    const genre = req.body.genre;
    const release_date = req.body.release_date;
    const is_showing = req.body.is_showing;
    if (!title || !duration) {
        return res.status(403).json({ error: "Champs manquants" });
    }
    try {
        const result = await filmsModel.create({ title: title, description: description, duration: duration, genre: genre, release_date: release_date, is_showing: is_showing });
        res.status(201).json(result);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "erreur lors de la création du film" });

    }
}



export default {
    getAll,
    getShowing,
    getById,
    create
}