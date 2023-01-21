import { Router } from "express";
import { singUp } from "../controllers/auth.js";
import { validateSchema } from "../middlewares/validadeSchema.js";
import { singUpSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/singUp", validateSchema(singUpSchema), singUp);

export default authRouter;
