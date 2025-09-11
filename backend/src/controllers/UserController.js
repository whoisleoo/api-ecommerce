import { prisma } from "../database/db.js";
import bcrypt from 'bcryptjs'



  export const registrarUser = async function (req, res){
    const { email, senha, nome, sobrenome, cpf} = req.body; 
    
    try{

        const senhaHash = await bcrypt.hash(senha, 10); //criptografar a senha

    const newUser = await prisma.user.create({
      data: {
        email : email.toLowerCase().trim(),
        senha : senhaHash,
        nome : nome.trim(),
        sobrenome : sobrenome.trim(),
        cpf: cpf.replace(/\D/g, '')
      }
    });

    const { senha: _, ...userFilter } = newUser; 

    res.status(201).json({ message: "Conta criada com sucesso", user: userFilter});
    console.log(`Úsuario ${userFilter.nome} foi cadastrado com sucesso.`);

}catch(error){
    console.log(`Erro ao cadastrar úsuario: ${error}`)

    if(error.code == 'P2002'){ // P2002 | Codigo de erro do prisma pra arquivos que violam o @unique
        const campo = error.meta?.target?.[0] || 'Algum campo'; 
        return res.status(400).json({error: `${campo === 'email' ? 'Email' : 'CPF'} já está em uso.`}) 
    }

    res.status(500).json({error: "Erro interno no servidor."});
}
    
}


export const listarUser = async function (req, res){
    try{ 
         const users = await prisma.user.findMany({
          select: {
          id: true,
          email: true,
          nome: true,
          sobrenome: true,
          role: true,
          criado: true,
          status: true
          }
         });
          res.status(200).json(users);
        
    } catch (error){
        res.status(500).json({ error: "Erro ao buscar usuários. ", message: error.message}); 
    }
  }


export const buscarUser = async function (req, res){
    const { id } = req.params
    

    try{
        const users = await prisma.user.findUnique({ 
            where: { id },
            select: {
              id: true,
              email: true,
              nome: true,
              sobrenome: true,
              role: true,
              cpf: true,
              endereco: true,
              telefone: true,
              criado: true,
              status: true

            }
        });

        if(!users){
          res.status(404).json({error: "Usuário não encontrado."}) // Pra não retornar null.
        }
        res.status(200).json({message: "Usuario encontrado com sucesso", user: users});
      }catch(error){
        res.status(500).json({error: "Erro interno doservidor", erro_encontrado: error.message});
      }
}


export const deleteUser = async function (req, res){
  const { id } = req.params;

   try{
    const dados = await prisma.user.findUnique({
        where: {
            id: id
        }
    });

    if(!dados){
      return res.status(404).json({error: "Usuário não encontrado."})
    }

    await prisma.user.update({ 
      where: { id },
      data: { status: false }
    });


    res.status(200).json({message: "Usuario desativado com sucesso", user: dados.nome});
}catch(error){
    res.status(500).json({message: "Erro interno do servidor. ", error: error.message})
  }
};