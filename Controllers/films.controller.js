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

export default {
    getAll,
    getShowing,
    getById
}