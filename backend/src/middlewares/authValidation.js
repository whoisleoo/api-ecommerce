import jwt from 'jsonwebtoken';
import { prisma } from '../database/db.js';


export const verificarAuth = async function (req, res, next){ 
    try{
        const authHeader = req.headers.authorization; 

        if(!authHeader){
           return res.status(401).json({
                error: "Token de acesso não fornecido."
            });
        }

        const token = authHeader.split(' ')[1]; // Separa o token do bearer

        if(!token){
            return res.status(401).json({
                error: "Token fornecido inválido."
            })
        }

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET); 

        const user = await prisma.user.findUnique({
            where: { id: decodeToken.id },
            select: {
                id: true,
                role: true,
                email: true,
                status: true
            }
        });

        if(!user || !user.status){
            return res.status(401).json({
                error: "Usuário não encontrado ou desativado."
            });
        }


        req.user = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        next();

    }catch(error){
        res.status(500).json({
            message: "Erro de autenticação, verifique se o token não expirou.",
            error: error.message
        })
    }
}


export const verificarAdmin = function (req, res, next){
    if(req.user.role !== 'ADMIN'){
        return res.status(403).json({
            error: "Acesso negado. Você não tem permissão para acessar essa página."
        });
    }
    next();
}



export const verificarPerm = function (req, res, next){
    const { id } = req.params;
    const userLogado = req.user;

    if(userLogado.role === 'ADMIN'){
        return next();
    }
    


    if(userLogado.id !== id){
        return res.status(403).json({
            error: "Você não tem permissão para acessar essa página."
        })
    }
    next();
}