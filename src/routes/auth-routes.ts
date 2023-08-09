import express from 'express';
const router = express.Router()
import authentication from '../controllers/authentication';
import validate from '../validations/validate';
import { registerUser } from "../validations/validator";

router.post("/registerUser",validate(registerUser),authentication.registerUser);
router.post("/signin",authentication.login)

export default router;
