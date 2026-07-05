const client = require("../db");

const createMovie = async (req, res) => {

    try{
    
    const {name , year} = req.body;

    const result = await client.query(
        "INSERT INTO movies (name,year) VALUES($1, $2) RETURNING *",
        [name,year]
    );
    res.status(201).json(result.rows[0]);
}
catch(error){
    res.status(500).json({
        message: error.message
    });

}
};



module.exports = {

    createMovie

};