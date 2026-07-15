import express, { type Request, type Response } from "express";
import cors from 'cors'
import productRoutes from './routes/productRoutes'


const app = express();


//middleware

app.use(express.json())
app.use(cors())


// routes

app.use('/api/products', productRoutes)


app.get("/", (req: Request, res: Response) => {
  res.send("Backend Application Running ....");
});

export default app;
