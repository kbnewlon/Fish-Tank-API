const express = require("express");
const router = express.Router();
const db = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.get("/", (req, res) => {
    db.User.findAll().then(dbUsers => {
        res.json(dbUsers);
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
})

router.post("/", (req, res) => {
    db.User.create({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    }).then(newUser => {
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

module.exports = router