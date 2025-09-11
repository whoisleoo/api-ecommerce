import { prisma } from '../database/db.js';
import bcrypt from  'bcryptjs';
import jwt from 'jsonwebtoken';


export const loginUser = async function (req, res){
    const { email, senha } = req.body;

    try{
    const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase().trim() },
        select: {
          id: true,
          email: true,
          senha: true,
          nome: true,
          sobrenome: true,
          role: true,
          criado: true,
          status: true
        }
    })
    if(!user){
       return res.status(401).json({error: "Usuário com esse email não encontrado"});
    }

    if(!user.status){
       return res.status(401).json({error: "Usuário desativado."})
    }

    const match = await bcrypt.compare(senha, user.senha);

    if(!match){
       return res.status(401).json({error: "Email ou senha incorretos."})
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h'
        }
    );

    const {senha: _, ...userFilter } = user; 

    res.status(200).json({
        message: "Usuario logado com sucesso.",
        user: userFilter,
        token: token
    })



    }catch(error){
        res.status(500).json({
            message: "Erro interno no servidor.",
            erro: error.message
        })
    }
}



export const verificarToken = async function (req, res){ 
    try{
        const { id } = req.user;

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                senha: true,
                nome: true,
                sobrenome: true,
                role: true,
                criado: true,
                status: true
            }
        });

        if(!user || !user.status){
            return res.status(401).json({
                error: "Token inválido ou usuário desativado."
            })
        }

        res.status(200).json({
            message: "Token válido.",
            user: user
        })



    }catch(error){
        res.status(500).json({
            message: "Erro interno do servidor",
            error: error.message
        });
    }
}



export const logoutUser = async function (req, res){
    

    res.status(200).json({
        message: "Logout realizado com sucesso."
    });
}