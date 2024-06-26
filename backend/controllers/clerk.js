import db from "../db.js";
import bcrypt from "bcrypt";
const saltRounds = 10;


export const getClerks = (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM clerk WHERE email = ?";

    db.query(query, [email], (err, data) =>{
        if (err) {
            console.error('Erro ao consultar banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao autenticar usuário' });
        }

        if (data.length > 0) {
            bcrypt.compare(password, data[0].password, (err, result) => {
                if(result) {
                    const clerk = data[0];

                    const responseClerk = {
                      registration: clerk.registration,
                      typeAssistance: clerk.type_assistance,
                      name: clerk.name,
                      course: clerk.course,
                      noticeNumber: clerk.notice_number,
                      dateStartedAssistance: clerk.date_started_assistance,
                      photo: `http://localhost:3030/uploads/${clerk.photo}`,
                    };

                    return res.status(200).json({ message: 'Usuário autenticado com sucesso', responseClerk });
                } else {
                    return res.status(404).json({ error: 'Usuário não encontrado' });
                }
            })
            
        } else {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
    });
};

export const registerClerk = (req,res) => {
    const { nameClerk, emailClerk, passwordClerk, shiftClerk, idAdministrator } = req.body;
    const photoClerk = req.file ? req.file.filename : null;

    const query = "SELECT * FROM clerk WHERE email = ?";

    db.query(query, [emailClerk], (err,data) => {
        if(err) {
            console.error('Erro ao consultar banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao buscar atendente' });
        }

        if(data.length == 0) {
            bcrypt.hash(passwordClerk, saltRounds, (err,hash) => {
                let queryInsert = "INSERT INTO clerk (full_name, email, password, shift, photo, id_administrator) VALUES (?,?,?,?,?,?)" 

                db.query(queryInsert,[nameClerk, emailClerk, hash, shiftClerk,photoClerk, idAdministrator], (err, data) => {
                    if(err) {
                        console.error('Erro ao inserir atendente no banco de dados:', err);
                        return res.status(500).json({ error: 'Erro ao inserir atendente no banco de dados' });
                    }
                    const imageUrl = photoClerk ? `/uploads/${photoClerk}` : null;
                    return res.status(200).json({ message: 'Atendente cadastrado com sucesso' });
                })
            })


        } else {
            console.error('Atendente já cadastrado!', err);
            return res.status(500).json({ error: 'Já existe esse atendente cadastrado' });
        }
    });
}