import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import walletRouter from "./routes/walletRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES:
app.use([authRouter, walletRouter]);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running in port: ${PORT}`));
