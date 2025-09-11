# LISTA DE ROTAS PRA EU NÃO ESQUECER.

````
GET /products → Lista produtos (public)
GET /products/:id → Produto especifico (public)
POST /products → Criar produto (admin)
PUT /products/:id → Atualizar produto (admin)
DELETE /products/:id → Remover produto (admin)
````

### Carrinho:

````
GET /cart → Ver carrinho (user logado)
POST /cart → Adicionar ao carrinho (user logado)
PUT /cart/:id → Atualizar quantidade (user logado)
DELETE /cart/:id → Remover item (user logado)
DELETE /cart → Limpar carrinho (user logado)
````

### Usuários:

````
POST /register → Registro (public)
GET /user → Listar usuários (admin)
GET /user/:id → Usuário específico (admin)
````

### Autenticação:

````
POST /auth/login → Login
GET /auth/verify → Verificar token
POST /auth/logout → Logout

````