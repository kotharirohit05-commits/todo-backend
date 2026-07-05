const client = require("../db");

const createStudent = async (req, res) => {

    try {

        const { name, isStressed } = req.body;

        const result = await client.query(

            "INSERT INTO students (name, isStressed, user_id) VALUES ($1, $2, $3) RETURNING *",

            [name, isStressed, req.user.id]

        );

        res.status(201).json(result.rows[0]);

    }

    catch(error) {

        res.status(500).json({

            message: error.message

        });

    }

};

const getStudentsWithUser = async (req, res) => {

    try {

        const result = await client.query(

            `SELECT
                students.name AS student_name,
                users.email
             FROM students
             JOIN users
             ON students.user_id = users.id`

        );

        res.status(200).json(result.rows);

    }

    catch(error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getStudent = async (req , res) =>{
        try {

        const result = await client.query(

           "SELECT * FROM students WHERE user_id = $1 ORDER BY id ASC",
           [req.user.id]

        );

        res.status(200).json(result.rows);

    }

    catch(error) {

        res.status(500).json({

            message: error.message

        });

    }
}
const getStudentById = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await client.query(

            "SELECT * FROM students WHERE id = $1 AND user_id = $2",

            [id, req.user.id]

        );
        if (result.rows.length === 0) {
        return res.status(404).json({
        message: "Student not found"
    });
}

        res.status(200).json(result.rows[0]);

    }

    catch(error) {

        res.status(500).json({

            message: error.message

        });

    }

};
const updateStudent = async (req, res) => {

    try {

        const { id } = req.params;

        const { name, isStressed } = req.body;

        const result = await client.query(

            "UPDATE students SET name = $1, isStressed = $2 WHERE id = $3 AND user_id = $4 RETURNING *",

            [name, isStressed, id,  req.user.id]

        );

        if (result.rows.length === 0) {

        return res.status(404).json({

        message: "Student not found"

    });

}
        res.status(200).json(result.rows[0]);

    }

    catch(error) {

        res.status(500).json({

            message: error.message

        });

    }

};
const deleteStudent = async (req, res) => {

    try {

        const { id } = req.params;

        await client.query(

            "DELETE FROM students WHERE id = $1 AND user_id = $2 RETURNING *",

           [id, req.user.id]

        );
        if (result.rows.length === 0) {

        return res.status(404).json({
        
            message: "Student not found"
    });

}

        res.status(200).json({

            message: "Student deleted successfully"

        });

    }

    catch(error) {

        res.status(500).json({

            message: error.message

        });

    }

};



module.exports = {

    createStudent,
    getStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
    getStudentsWithUser

};