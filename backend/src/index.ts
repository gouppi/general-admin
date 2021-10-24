import express from 'express'
import mongoose from 'mongoose';

import {createUser, deleteUser, getUsers, loginUser} from './controllers/User';
// import { UserType } from './models/User';
import Result from './models/Result';
import verifyJWT from './middleware/authentication';

const port = 8080; // default port to listen
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const dbUrl = "mongodb://DonaldDuck:ScroogeMcDuck@127.0.0.1:27017/users"

mongoose.connect(dbUrl, {ssl:false, authSource:"admin", directConnection:true, readPreference:"primary" }).then(() => {
    app.listen(port, () => console.log("Server is Live"))

    app.post("/register", async(req,res) => {
        const result : Result = await createUser(req.body);
        res.status(result.statusCode).send(result);
    });

    app.delete("/users/:user_id", verifyJWT, async(req,res) => {
        const result: Result = await deleteUser(req.params.user_id);
        res.status(result.statusCode).send(result);
    })

    app.get("/userInfo", verifyJWT, async(req,res) => {
        const result : Result = {
            message: "",
            success: true,
            statusCode: 200,
            data: {...res.locals.user, loggedIn: res.locals.loggedIn}
        }
        res.status(200).send(result);
    })

    app.get("/users", verifyJWT, async(_,res) => {
        const result : Result = await getUsers();
        res.status(result.statusCode).send(result);
    })

    app.post("/login", async(req,res) => {
        const result: Result = await loginUser(req.body);
        res.status(result.statusCode).send(result);
    })
})
.catch(err => console.log(err));

