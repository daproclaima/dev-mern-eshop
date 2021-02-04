import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5000
const env = process.env.NODE_ENV || 'development'

app.get('/', (req   , res) => {
    res.send('API is running')
})

app.use('/api/products', productRoutes)

app.listen(PORT,
    console.log(
        `server running in ${env} mode on port ${PORT}`.yellow.bold
    )
)
