import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import Taskrouter from './routes/Task.route.js'

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4173'],
  credentials: true
}))


// routes 

app.use('/api/task', Taskrouter)

// Replace lines 21-23 with this improved connection code:

// Remove the duplicate app.listen and keep just one:

mongoose.connect(process.env.MONGODB_CONN)
  .then(() => {
    console.log('Database connected.')
  })
  .catch(err => {
    console.error('Database connection failed:', err.message)
  })

// Add connection event listeners for ongoing issues
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Keep only ONE app.listen call
app.listen(PORT, () => {
    console.log('Server running on port:', PORT)
})