const express = require("express")
const mainRouter = require("./routes/index")

const app = express()

app.use(cors())
app.use(express.json())

// redirect all api/v1 router to mainRouter
app.use("/api/v1",mainRouter)

app.use("/*",(req,res,next) => {
    next({message:"Page not fount", status:404});
})

app.use((err,req,res,next)=> {
    res.status(err.status || 500)
    res.send({Error: err.message || "Internal Server Error"})
})

app.listen(3000,() => {
    connection();
    console.log("App running on port: 3000");
})