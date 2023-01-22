import { Router } from "express";
import { singIn, singOut, singUp } from "../controllers/auth.js";
import { validateSchema } from "../middlewares/validadeSchema.js";
import { singInSchema, singUpSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/singUp", validateSchema(singUpSchema), singUp);
authRouter.post("/singIn", validateSchema(singInSchema), singIn);
authRouter.post("/singOut", singOut);

export default authRouter;
