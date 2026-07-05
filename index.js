require("dotenv").config();
const cors = require("cors");
const express = require("express");

const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
app.use(cors());


// MIDDLEWARE
app.use(express.json());


// ROUTES
app.use("/api", studentRoutes);
app.use("/api", userRoutes);
app.use("/api", todoRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});