import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Charge .env avant de lire process.env.DB_HOST, etc.
dotenv.config()

// await au niveau du fichier : la connexion est créée au chargement du module.
// createConnection ouvre une seule connexion (suffisant pour un projet d'apprentissage).
// En production, on utiliserait plutôt un "pool" (plusieurs connexions réutilisées).
const connection = await mysql.createConnection({
    host: process.env.DB_HOST,         // adresse du serveur MySQL (souvent 127.0.0.1)
    user: process.env.DB_USER,         // nom d'utilisateur MySQL
    password: process.env.DB_PASSWORD, // mot de passe MySQL
    port: process.env.DB_PORT,         // port MySQL, 3306 par défaut
    database: process.env.DB_NAME      // nom de la base (ex. "cinehub")
})

// export default : les autres fichiers font "import Db from '../Config/db.js'"
export default connection;
