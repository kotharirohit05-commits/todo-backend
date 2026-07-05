const express = require("express");

const app = express();

app.use(express.json());

let movies = [];

app.post("/movies" , (req,res) => {

    const movie = req.body;

    movies.push(movie);

    res.send("Movie Added 😘 ");

})

app.put("/movies/:id", (req,res) => {

    const id = req.params.id;
    const newTitle = req.body.title;
    for(let i = 0 ; i < movies.length ; i++){
        if(movies[i].id == id){
            movies[i].title = newTitle;
        }
    }
    res.send("Movies Updates 😒");

})

app.get("/movies" , (req , res) => {
    res.json(movies);
})

app.delete("/movies/:id" , (req,res) =>{
    
    const id = req.params.id;

    movies = movies.filter((movie) => movies.id != id);
    res.send("Deleted (❁´◡`❁)");

})





app.listen(5000 , () => {
    console.log("Yes its working");
})