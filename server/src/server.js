import 'dotenv/config';
import express from 'express';import cors from 'cors';
import {connectDB} from './config/db.js';
import productRoutes from './routes/productRoutes.js';import paymentRoutes from './routes/paymentRoutes.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import { requireAdminAuth, requireSuperAdmin } from './middleware/adminAuthMiddleware.js';
import { listAdminUsers, createInvitation } from './controllers/adminAuthController.js';
const app=express();
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://127.0.0.1:5173',
];
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || process.env.NODE_ENV !== 'production' || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
  })
);app.use(express.json({limit:'1mb'}));
app.get('/api/health',(req,res)=>res.json({success:true,service:'Gramiyam API',status:'running'}));
app.use('/api/products',productRoutes);app.use('/api/payments',paymentRoutes);
app.use('/api/admin/auth',adminAuthRoutes);
app.get('/api/admin/users',requireAdminAuth,requireSuperAdmin,listAdminUsers);
app.post('/api/admin/users',requireAdminAuth,requireSuperAdmin,createInvitation);
app.use((req,res)=>res.status(404).json({success:false,message:'Route not found'}));
app.use((err,req,res,next)=>{console.error(err);res.status(500).json({success:false,message:process.env.NODE_ENV==='production'?'Internal server error':err.message});});
const port=process.env.PORT||5000;
connectDB().then(()=>app.listen(port,()=>console.log(`Gramiyam API listening on ${port}`))).catch(err=>{console.error('Database startup failed:',err);process.exit(1)});
