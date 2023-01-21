import { Router } from "express";
import { singIn, singUp } from "../controllers/auth.js";
import { validateSchema } from "../middlewares/validadeSchema.js";
import { singInSchema, singUpSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/singUp", validateSchema(singUpSchema), singUp);
authRouter.post("/singIn", validateSchema(singInSchema), singIn);

export default authRouter;
