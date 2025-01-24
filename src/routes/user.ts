import express from "express";
import { getMessageList, importExcel } from "../controllers/user";
import { verifyToken } from "../middleware/auth";
import multer from 'multer'

const storage = multer.memoryStorage();
const upload = multer({ storage });

const route = express.Router();
route.post("/import-excel", verifyToken, upload.single("file"),importExcel);

route.post("/message/list", verifyToken, getMessageList);


export default route;
