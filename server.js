const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

const db = require("./app/modals")
db.sequelize.sync({force: true}).then(()=>{
    console.log("Drop and re-sync db");
})

var corsOptions = {
    origin: "http://localhost:8080"
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extented: true}))

app.get("/", (req, res)=>{
    res.json({message: "Welcome to Forever"})
})

const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})






