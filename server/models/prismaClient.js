
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function connectToDB() {
  try {
    await prisma.$connect();
    console.log("✅ DB connected successfully");
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err.message);
    process.exit(1);
  }
}

connectToDB(); // call it once on startup

export default prisma;
