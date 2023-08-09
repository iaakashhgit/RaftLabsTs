import express, {Router} from 'express'
import raftLabsFunction from '../controllers/raftLabs'
import validate from '../validations/validate'
import { postData } from "../validations/validator";

const router: Router = express.Router();

router.post("/postData",validate(postData),raftLabsFunction.raftLabsCreate)
router.get("/getData",raftLabsFunction.getData)
router.put('/updateData',raftLabsFunction.updateData)
router.delete('/deleteData',raftLabsFunction.deleteData)
router.post('/getAllData',raftLabsFunction.getAllData)

export default router
