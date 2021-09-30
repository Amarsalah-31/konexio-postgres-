const express = require("express");
const app = express();
const dotenv = require("dotenv");
const {Pool} = require("pg");
dotenv.config({
    path: " ./config.env",
});

app.use(express.json());

// CONNECTION TO PORTGRES
const postgres = new Pool({ ssl: {rejectUnauthorized: false} });
 
app.get("/", async (_req, res) =>{
    let students;
    try{
        students = await postgres.query("SELECT * FROM students");
}catch (err){ return res.status(400).json({
    message:"An error happend",
});
}
res.json({
    message: "success",
    data: students.rows,
});
});
app.get("/:id", async(req, res)=>{
    const studentId = req.params.id;
    let student;

     try{
         student = await postgres.query("SELECT *FROM  students WHERE id=$1",[studentId,]);

     }catch (err){
         return res.status(400).json({
             message:"An error happened",
         });
     }
     res.json({
         message: "success",
         data: student.rows,
     });
});
app.post("/students", async(req, res) =>{
    const username = req.body.name;
    try{
        await postgres.query("INSER INTO student(name, city)VALUES ($1,$2)",[
            name,
            city,
        ]);
    }catch (err){
        return res.status(400).json({
            message: "An error happened",
        });
    }
    res.status(201).json({
        message: "success",
    });
});
app.listen(process.env.PORT, () =>{
    console.log("Listening on port 3000");
});