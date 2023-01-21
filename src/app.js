import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES:

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running in port: ${PORT}`));
