import { Router } from "express";

// Controllers
import { addChangeWallet, getWallet } from "../controllers/wallet.js";

// Middlewares
import { authValidation } from "../middlewares/authMiddleware.js";

// Schemas
import { validateSchema } from "../middlewares/validadeSchema.js";
import changeSchema from "../schemas/changeSchema.js";

const walletRouter = Router();

walletRouter.use(authValidation);
walletRouter.get("/wallet", validateSchema(changeSchema), getWallet);
walletRouter.post("/wallet", addChangeWallet);

export default walletRouter;
