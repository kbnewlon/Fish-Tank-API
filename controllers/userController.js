const express = require("express");
const router = express.Router();
const db = require('../models');


router.get("/", (req, res) => {
    db.User.findAll().then(dbUsers => {
        res.json(dbUsers);
    })
})

router.post("/", (req, res) => {
    db.User.create({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    }).then(newUser => {
        res.jason(newUser);
    })
})

module.exports = router