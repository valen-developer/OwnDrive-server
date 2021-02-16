import { Router } from "express";

import { authRouter } from "./auth.routes";
import { driveRouter } from "./drive.routes";
import { userRouter } from "./user.routes";

export const router: Router = Router();

router.use(authRouter);
router.use("/user", userRouter);
router.use("/drive", driveRouter);
