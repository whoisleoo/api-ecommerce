# LISTA DE ROTAS PRA EU NÃO ESQUECER.

````
GET /products → Lista produtos (public) ✅
GET /products/:id → Produto especifico (public) ✅
POST /products → Criar produto (admin) ✅

EXEMPLO:
{
    "nome": "Camisa Teste",
    "descricao": "Camisa preta bem bonita",
    "preco": 50.00,
    "categoria": "camisas",
    "estoque": 3
}

PUT /products/:id → Atualizar produto (admin) ✅
DELETE /products/:id → Remover produto (admin) ✅
````

### Carrinho:

````
GET /cart → Ver carrinho (user logado) ✅
POST /cart → Adicionar ao carrinho (user logado) ✅

EXEMPLO:
{
    "produtoId": "UUID",
    "quantidade": 1
}

PUT /cart/:id → Atualizar quantidade (user logado) ✅
DELETE /cart/:id → Remover item (user logado) ✅
DELETE /cart → Limpar carrinho (user logado) ✅
````

### Usuários:

````
POST /register → Registro (public) ✅

EXEMPLO:
{
    "email": "seuemail@gmail.com",
    "senha": "suasenha123",
    "nome": "seunome",
    "sobrenome": "seusobrenome",
    "cpf": 12345678910
}

GET /user → Listar usuários (admin) ✅
GET /user/:id → Usuário específico (admin) ✅
````

### Autenticação:

````
POST /auth/login → Login ✅
GET /auth/verify → Verificar token ✅
POST /auth/logout → Logout ❌

````