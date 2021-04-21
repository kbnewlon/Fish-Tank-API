const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require('../models');


const checkAuthStatus = request => {
    if (!request.headers.authorization) {
        return false
    }
    //gets bearer token
    const token = request.headers.authorization.split(" ")[1]
    console.log(token);

    //once the token is received jwt will verify it 
    const loggedInUser = jwt.verify(token, 'secretString', (err, data) => {
        if (err) {
            return false
        }
        else {
            return data
        }
    })
    console.log(loggedInUser);
    return loggedInUser

}


router.get("/", (req, res) => (
    db.Tank.findAll().then(tanks=>{
        res.json(tanks);
    }).catch(err=>{
        console.log(err);
        res.status(500).send("something went wrong")
    })
))


router.post("/", (req, res) => (
    db.Tank.create({
        name: req.body.name,
        Id:1
    }).then(newTank=>{
        res.json(newTank);
    }).catch(err=>{
        console.log(err);
        res.status(500).send("something went wrong")
    })
))



module.exports = router