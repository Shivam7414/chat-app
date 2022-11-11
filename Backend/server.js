const express = require("express");
const connectDB = require("./config/db");
const env = require("dotenv"); //This module for enviroment variable setup.
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/userRoutes");
const authUser = require("./routes/chatRoutes");
const { notFound, errorHandler } = require('./middleware/errorMiddleWare')
const { chat, chats } = require("./data/data")
var cors = require('cors')


env.config(); //This is for accessing environment variables
connectDB() //caling config file
const app = express() //Aplication started

app.use(cors())
app.use(express.json()) //to accept json data

// For check api is woring
app.get('/', (req, res) => {
    res.send("API is running")
})


// app.get("/api/chats", (req, res) => {
//     res.send(chats)
// })

app.use(cors())
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes)
app.use("api/login", authUser)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on ${PORT}`));
