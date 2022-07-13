// BUILD YOUR SERVER HERE
const express = require('express');
const Mvp = require('./users/model')

//Instance of the Express App
const server = express;

//Global Middleware
server.use(express.json());

//Endpoints
//Endpoints
//Endpoints
//Endpoints
//Endpoints
//When the client makes a `POST` request to `/api/users`:
server.post('/api/users', async(req, res) => {
    try {
        if(!req.body.name || !req.body.bio){
            res.status(400).json({
                message: "Please provide name and bio for the user",
            })
        }else{
            const newUser = await Mvp.insert(req.body);
            res.status(201).json({
                message: `the user ${newUser} has been created.`
            });
        }

    }
    catch(err){
        res.status(500).json({
            message: "There was an error while saving the user to the database",
            error: err.message
        
        })
    }
})

//When the client makes a `GET` request to `/api/users`:

server.get('/api/users', async(req, res) => {
    try{
        const users = await Mvp.findAll();
        res.json(users)

    }
    catch(err){
        res.status(500).json({
            message: "The user information could not be retrieved",
            error: err.message

        })
    }
})

//When the client makes a `GET` request to `/api/users/:id`:
server.get('/api/users/:id', async(req, res)=> {
    try {
        const user = await Mvp.findById(req.params.id);
        if(!user){
            res.status(404).json({
                message: "The user with the specified ID does not exist",
            })
        }else {
            res.json(user);
        }
    }
    catch(err){
        res.status(500).json({
            message: "The user with the specified ID does not exist",
            error: err.message
        })
    }
})




module.exports = server; // EXPORT YOUR SERVER instead of {}
