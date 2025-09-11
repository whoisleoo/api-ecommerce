/*
  Warnings:

  - The primary key for the `CartItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OrderItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CartItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "criado" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CartItem_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CartItem_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CartItem" ("criado", "id", "produtoId", "quantidade", "usuarioId") SELECT "criado", "id", "produtoId", "quantidade", "usuarioId" FROM "CartItem";
DROP TABLE "CartItem";
ALTER TABLE "new_CartItem" RENAME TO "CartItem";
CREATE UNIQUE INDEX "CartItem_usuarioId_produtoId_key" ON "CartItem"("usuarioId", "produtoId");
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numero" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "subtotal" DECIMAL NOT NULL,
    "frete" DECIMAL NOT NULL DEFAULT 0,
    "desconto" DECIMAL NOT NULL DEFAULT 0,
    "total" DECIMAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "enderecoEntrega" TEXT NOT NULL,
    "cidadeEntrega" TEXT NOT NULL,
    "cepEntrega" TEXT NOT NULL,
    "estadoEntrega" TEXT NOT NULL,
    "complemento" TEXT,
    "telefoneEntrega" TEXT NOT NULL,
    CONSTRAINT "Order_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("cepEntrega", "cidadeEntrega", "complemento", "createdAt", "desconto", "enderecoEntrega", "estadoEntrega", "frete", "id", "numero", "status", "subtotal", "telefoneEntrega", "total", "updatedAt", "usuarioId") SELECT "cepEntrega", "cidadeEntrega", "complemento", "createdAt", "desconto", "enderecoEntrega", "estadoEntrega", "frete", "id", "numero", "status", "subtotal", "telefoneEntrega", "total", "updatedAt", "usuarioId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_numero_key" ON "Order"("numero");
CREATE TABLE "new_OrderItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pedidoId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "nomeProduto" TEXT NOT NULL,
    "precoProduto" DECIMAL NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "subtotal" DECIMAL NOT NULL,
    CONSTRAINT "OrderItem_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderItem" ("id", "nomeProduto", "pedidoId", "precoProduto", "produtoId", "quantidade", "subtotal") SELECT "id", "nomeProduto", "pedidoId", "precoProduto", "produtoId", "quantidade", "subtotal" FROM "OrderItem";
DROP TABLE "OrderItem";
ALTER TABLE "new_OrderItem" RENAME TO "OrderItem";
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "preco" DECIMAL NOT NULL,
    "categoria" TEXT NOT NULL,
    "estoque" INTEGER NOT NULL DEFAULT 0,
    "imagem" TEXT,
    "peso" DECIMAL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Product" ("categoria", "createdAt", "descricao", "estoque", "id", "imagem", "nome", "peso", "preco", "status", "updatedAt") SELECT "categoria", "createdAt", "descricao", "estoque", "id", "imagem", "nome", "peso", "preco", "status", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_User" ("createdAt", "email", "id", "status") SELECT "createdAt", "email", "id", "status" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
