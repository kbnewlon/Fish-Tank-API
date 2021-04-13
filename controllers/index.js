const express = require("express");
const router = express.Router();

const userRoutes = require("./userController");


router.get("/", (req, res) => (
    res.send("welcome to my fishes!")
))

router.use("/api/users", userRoutes);

module.exports = router