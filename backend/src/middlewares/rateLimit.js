import ratelimit, { rateLimit } from 'express-rate-limit';



export const loginLimiter = ratelimit({
    windowMs: 15 * 60 * 1000, // tempo em minutos pra cada requisição
    max: 5, // maximo de requisição de acordo com o tempo
    message: 'Muitas requisições, aguarde um segundo e tente novamente.',
    standardHeaders: true,
    legacyHeaders: true,

    handler: function (req,res){
        res.status(429).json({
            error: "Muitas requisições de login.",
            message: "Aguarde um minuto e tente novamente mais tarde."
        });
    }
})



export const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: 'Muitas requisições, aguarde um segundo e tente novamente.',

    handler: function (req, res){
        res.status(429).json({
            error: "Limite de registros excedido.",
            message: "Aguarde um minuto e tente novamente mais tarde."
        });
    }
})



export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 150,
    message: 'Muitas requisições, aguarde um segundo e tente novamente.',

    standardHeaders: true,

    handler: function (req, res){
        res.status(429).json({
            error: "Limite de requisições excedido.",
            message: "Aguarde um minuto e tente novamente mais tarde."
        });
    }
})




export const adminLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 150,
    message: 'Muitas requisições, aguarde um segundo e tente novamente.',

    skip: function (req) {
        return req.user?.role !== 'ADMIN';
    },

    handler: function (req, res){
        res.status(429).json({
            error: "Limite de requisições excedido.",
            message: "Aguarde um minuto e tente novamente mais tarde."
        });
    }
})