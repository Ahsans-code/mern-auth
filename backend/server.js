import express from 'express'
import dotenv from 'dotenv'
import userRoutes from "./Routes/UserRoutes.js"
import { errorHandler, notFound } from './Middlewares/errorMiddleware.js';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
dotenv.config()

connectDb();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use("/api/users", userRoutes)

// Basic route 
app.get('/', (req, res) => {
    res.send('Hello from Express server!');
});
app.use(notFound)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});