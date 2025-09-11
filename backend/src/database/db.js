import { PrismaClient } from "../generated/prisma/index.js";


const dbPath = process.env.DATABASE_URL;

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbPath
    }
  }
});