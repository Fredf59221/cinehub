import express from 'express';
import dotenv from 'dotenv';
import authRoute from './Routes/auth.route.js';
import usersRoute from './Routes/users.route.js';
import filmsRoute from './Routes/films.route.js';
import roomsRoute from './Routes/rooms.route.js';

// Charge .env 
dotenv.config();

const app = express();
app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/films", filmsRoute);
app.use("/rooms", roomsRoute);
app.get('/', (req, res) => {
    res.json({status : "OK"});
});

app.listen(process.env.SERVER_PORT, () => {
    console.log("http://127.0.0.1:"+process.env.SERVER_PORT);
});
