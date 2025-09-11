import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { generalLimiter } from './src/middlewares/rateLimit.js';
import { security, logSeguranca } from './src/middlewares/security.js'
import userRoutes from './src/routes/userRoutes.js'
import authRoutes from './src/routes/authRoutes.js'
import productRoutes from './src/routes/productRoutes.js' 
import cartRoutes from './src/routes/cartRoutes.js'  

const PORT = process.env.PORT || 8989;
const app = express()
const corsOptions = {
    origin: ["http://localhost:5173"], //Trocar pro servidor que vai rodar o FRONTEND
}

app.use(express.json());
app.use(cors(corsOptions))
app.use(security)
app.use(generalLimiter)
app.use(logSeguranca)

app.get('/', (req, res) => {
    res.json("API STATUS: WORKING")
})

app.use('/', userRoutes);
app.use('/auth', authRoutes);
app.use('/', productRoutes);
app.use('/', cartRoutes);


app.listen(PORT, () => {
    console.log(`API E-COMMERCE STARTED | http://localhost:${PORT}`)
})