import bcrypt from 'bcrypt';
import userModel from '../Models/users.model.js';
import jwt from 'jsonwebtoken';

async function register(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    if (!username || !email || !password) {
        return res.status(403).json({ error: "Champs manquants" });
    }
    try {
        const hash = bcrypt.hashSync(password, 10);
        const result = await userModel.insert({ username: username, email: email, password: hash });
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Une erreur est survenue lors de l'inscription !" });

    }

}
async function login(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(403).json({ error: "Champs manquants" });
    }
    try {
        const user = await userModel.getByUsername(username);
        if (!user) {
            return res.status(403).json({ error: "Identifiants incorrects" });
        }
        const isValid = bcrypt.compareSync(password, user.us_password);
        if (!isValid) {
            return res.status(403).json({ error: "Identifiants incorrects" });
        }
        const payload = { us_id: user.us_id, us_username: user.us_username, us_email: user.us_email, us_role: user.us_role};
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({message:"Connexion réussie", token});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Une erreur est survenue lors de la connexion !" });
    }


}
export default {
    register,
    login
}

