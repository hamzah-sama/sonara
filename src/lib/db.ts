import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
<<<<<<< HEAD
import { env } from "../../env";
=======
import { env } from "@/env";
>>>>>>> 08a485ace8bc8e3c7a5405ece324d829356cacf1

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
});

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };
