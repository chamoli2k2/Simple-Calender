import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Config dotenv
dotenv.config();

// Connecting Db
await connectDB();

// After connecting Db then start the server
const PORT = process.env.PORT || 6969;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// Path: api/users/userRoutes
import userRoutes from './routes/user.routes.js';
app.use('/api/users', userRoutes);


// Path: api/events/eventRoutes
import eventRoutes from './routes/event.routes.js';
app.use('/api/events', eventRoutes);