import express from 'express'
import mongoose from 'mongoose';

import {createUser, getUsers} from './controllers/User';
import { UserType } from './models/User';

const port = 8080; // default port to listen
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const dbUrl = "mongodb://DonaldDuck:ScroogeMcDuck@127.0.0.1:27017/users"

mongoose.connect(dbUrl, {ssl:false, authSource:"admin", directConnection:true, readPreference:"primary" }).then(() => {
    app.listen(port, () => console.log("Server is Live"))

    app.post("/register", async(req,res) => {
        const result : string = await createUser(req.body);
        res.json({"message": result});
    });

    app.get("/users", async(req,res) => {
        const result : UserType[] = await getUsers();
        res.json({"data": result});
    })


})
.catch(err => console.log(err));

