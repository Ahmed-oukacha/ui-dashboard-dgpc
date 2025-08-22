import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import dashboardRoutes from './routes/dashboardRoutes';
import fileRoutes from './routes/fileRoutes'; // 1. استيراد مسارات الملفات

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/files', fileRoutes); // 2. استخدام مسارات الملفات

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));