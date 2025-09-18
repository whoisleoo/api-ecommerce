import { PrismaClient } from "@prisma/client";


const dbPath = process.env.DATABASE_URL;

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbPath
    }
  }
});