const express = require("express")
const mainRouter = require("./routes/index")

const app = express()

// redirect all api/v1 router to mainRouter
app.use("/api/v1",mainRouter)