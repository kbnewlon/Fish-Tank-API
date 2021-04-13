const express = require("express");
const router = express.Router();

const userRoutes = require("./userController");


router.get("/", (req, res) => (
    res.send("welcome to my fishes!")
))

router.use("/api/user", userRoutes);

module.exports = router