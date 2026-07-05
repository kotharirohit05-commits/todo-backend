
const client = require("../db");

const createTodo =  async (req, res) => {
    try{
        const{title} = req.body;
        const userId = req.user.id;
        const result = await client.query(
            "INSERT INTO todos (title, user_id) VALUES($1, $2) RETURNING *",
            [title, userId ]
        );
        res.status(201).json(result.rows[0]);
    }
    catch(error){
        res.status(500).json({

            message: error.message

        });
    }
};

const getTodos = async (req, res) => {
    try{
        const result = await client.query(
            "SELECT * FROM todos where user_id = $1",
            [req.user.id]
        );
        res.status(200).json(result.rows);
    }
    catch(error){
        res.status(500).json({

            message: error.message

        });
    }
};

const getTodoById = async (req, res) => {
    try{
    const {id} = req.params;
    const result = await client.query(
        "SELECT * FROM todos where id = $1 AND user_id = $2",
        [id, req.user.id]
    );
        if (result.rows.length === 0) {
        return res.status(404).json({
        message: "list not found"
        });
    }
    res.status(200).json(result.rows[0]);
    }
    catch(error){
        res.status(500).json({
            message: error.message
        })
    }
};

const updateTodo = async (req, res) => {
    try {

        const { id } = req.params;
        const { title, completed } = req.body;
        const userId = req.user.id;

        const result = await client.query(
            `UPDATE todos
             SET title = $1,
                 completed = $2
             WHERE id = $3
             AND user_id = $4
             RETURNING *`,
            [title, completed, id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const deleteTodo = async (req, res) => {
    try{
        const {id} = req.params;
        const result = await client.query(
            "DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *",
            [id, req.user.id]
        )
        if (result.rows.length === 0) {

        return res.status(404).json({
        
            message: "list not found"
        });

    }
    res.status(200).json({
    message: "Todo deleted successfully"
});
}
    catch(error){
        res.status(500).json({
            message: error.message
        })
    }

};

module.exports = {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo
};