import dotenv from 'dotenv/config';
import path from 'path';
import express from 'express';
import cors from 'cors';
import { logger } from './middleware/logEvents.js';
import { errorHandler } from './middleware/errorHandler.js';
import subdir from './routes/subdir.js'
import root from './routes/root.js'
import employees from './routes/api/employees.js'
import register from './routes/register.js'
import auth from './routes/auth.js'
import refresh from './routes/refresh.js'
import logout from './routes/logaout.js'
import corsOptions from './config/corsOptions.js'
import verifyJWT from './middleware/verifyJWT.js';
import cookieParser from 'cookie-parser';
import credentials from './middleware/credentials.js';
import mongoose from 'mongoose';
import connectDB from './config/dbConn.js';

const app = express();
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// custom middleware logger - morgan is also a logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement

app.use(credentials);

app.use(cors(corsOptions));

// middleware to handle forms
app.use(express.urlencoded({extended: false}));
// middleware to handle json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// middleware to serve static files
// app.use(express.static(path.join(process.cwd(), 'public')));
// app.use('/subdir', express.static(path.join(process.cwd(), 'public')));

// routes
app.use('/', root)
app.use('/register', register)
app.use('/auth', auth)
app.use('/refresh', refresh)
app.use('/logout', logout)

app.use(verifyJWT);
app.use('/employees', employees);

// Route handlers

app.all('*', (req, res) => {
    res.status(404).json({error: "404 Not Found"});  
});

app.use(errorHandler);
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
