import { Router } from "express";
import { ssrController } from "../controllers";

const router = Router();

router.get("*", ssrController);

export default router;
