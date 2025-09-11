import helmet from "helmet";


export const security = helmet({

    contentSecurityPolicy: { // algumas politicas de segurança a serem executadas via helmet
        directives: {
            defaultSrc: ["'self'"], // Apenas o dominio
            styleSrc: ["'self'", "'unsafe-inline'"], // Carrega o style.css e o style inline
            scriptSrc: ["'self'", "trusted-cdn.com"], // Apenas o dominio e bloqueia script externo
            imgSrc: ["'self'", "data", "https:"], // Apenas dominio e imagens externas em https
            objectSrc: ["'none'"],
            frameSrc: ["'none'"] 
        }
    },


    frameguard:{  // click jacking
        action: 'deny'
    },
    hsts: { // força https
        includeSubDomains: true,
        preload: true
    },
    noSniff: true, // sniffing
    xssFilter: true, // cross site scripting
    hidePoweredBy: true
})




const ipBloqueados = new Map(); 
const tempoBlock = 30 * 60 * 1000; 

export const logSeguranca = function (req, res, next){
    const ip = req.ip;


    const padraoAtaque = [ // previnir ataque sql basico e uns outros ai
        'DROP TABLE',
        'SELECT * FROM',
        '<script>',
        'javascript:',
        'onload=',
        '../../../',
        'passwd',
        '/etc/',
        '$_GET',
        '-- OR',
        'OR 1=1'
    ] 

    const fullUrl = req.url.toLowerCase(); // puxa o link do website
    const body = JSON.stringify(req.body || {}).toLowerCase(); // puxar o body raw em json

    const ataque = padraoAtaque.some(pattern => fullUrl.includes(pattern.toLowerCase()) || body.includes(pattern.toLowerCase()));


    if(ataque){
        ipBloqueados.set(ip, Date.now() + tempoBlock)

        console.log(`
        WARNING
        USER TRYING TO ATTACK
         º IP: ${req.ip}
         º URL: ${req.url}
         º BODY: ${body}
         º DATA: ${new Date()}
        
        `)

        return res.status(403).json({
            error: "Atividade suspeita detectada.",
            message: "Detectamos atividades suspeitas, se isso for um engano contate o suporte."
        })
    }
    next();
}
