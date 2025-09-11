import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'


const PORT = process.env.PORT || 8989;
const app = express()
const corsOptions = {
    origin: ["http://localhost:5173"], //Trocar pro servidor que vai rodar o FRONTEND
}

app.use(express.json());
app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.json("API STATUS: WORKING")
})


app.listen(PORT, () => {
    console.log(`API E-COMMERCE STARTED | http://localhost:${PORT}`)
})