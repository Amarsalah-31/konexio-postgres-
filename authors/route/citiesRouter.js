const express = require("express");
const {Pool} = require("pg");
const router = express.Router();

//postgres cooection
const postgres = new Pool({ ssl:{rejectUnauthorized: false}});

router.route("/")
.get(async(req, res) =>{
    let cities
    try {
        cities = await postgres.query("SELECT city FROM students");
        res.json({
            status: "sucess",
            demand: "Ask all cities",
            data: cities.rows,
        });
    }catch (err){
        res.status(400).json({
            message : "An error happened",
        });
    };
});

router.route("/:city")
.get(async(req, res) =>{
    const cityParams = req.params.city;
    const city = cityParams.substring(0,1).toUpperCase() + cityParams.substring(1).toUpperCase();
    console.log(city)
    let users;
    try {
        users = await postgres.query("SELECT * FROM  students WAHERE  city = $1", [city]);
        res.json({
            status: "Sucess",
            demand: `Students come from ${city}`,
            data: users.rows,
        });
    }catch(err){
        res.status(400).json({
            message: "An error happened",
        });
    };
});
module.exports = router;