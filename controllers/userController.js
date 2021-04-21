const express = require("express");
const router = express.Router();
const db = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



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

router.get("/", (req, res) => {
    db.User.findAll().then(dbUsers => {
        res.json(dbUsers);
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
})

router.post('/',(req,res)=>{
    db.User.create({
        email:req.body.email,
        name:req.body.name,
        password:req.body.password
    }).then(newUser=>{
        res.json(newUser);
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
})

router.post("/login", (req, res) => {
    db.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(foundUser => {
        if (!foundUser) {
            return res.status(404).send("USER NOT FOUND")
        }
        //unscrambles encryption to check if passwords match
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            const userTokenInfo = {
                email: foundUser.email,
                id: foundUser.id,
                name: foundUser.name
            }
            //creates unique token
            const token = jwt.sign(userTokenInfo, "secretString", { expiresIn: "2h" })
            res.status(200).send({ token: token })
        } else {
            return res.status(403).send("wrong password")
        }
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
})

router.get("/secretProfile", (req, res) => {
    const loggedInUser = checkAuthStatus(req);
    console.log(loggedInUser);
    if (!loggedInUser) {
        return res.status(401).send("invalid token")
    }
    db.User.findOne({
        where: {
            id: loggedInUser.id
        },
        include: [db.Tank]
    }).then(dbUser=>{
        res.json(dbUser)
    }).catch(err=>{
        console.log(err);
        res.status(500).send("an error occurred please try again later")
    })

});



module.exports = router