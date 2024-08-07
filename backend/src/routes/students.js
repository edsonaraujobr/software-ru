import express from "express";
import { getStudent, registerStudents, getAllStudents, updateStudent, removeStudent } from "../controllers/student.js";
import multer from "multer"
import path from "path";

const router = express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post("/aluno", getStudent)
router.post("/registrar-aluno", upload.single('photo'),registerStudents)
router.get("/listar-alunos", getAllStudents)
router.put("/atualizar-aluno", updateStudent)
router.delete("/remover-aluno", removeStudent)

export default router