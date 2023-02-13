const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

var corsOptions = {
    origin: "http://localhost:8080"
}

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({extented: true}))

app.use(bodyParser.urlencoded({extented: true}))

app.get("/", (req, res)=>{
    res.json({message: "Welcome to Forever"})
})

const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})






