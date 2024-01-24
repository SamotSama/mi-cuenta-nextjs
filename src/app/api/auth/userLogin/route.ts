import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient, usuarios } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  if (!body) return null;
  const { email, password } = body;

  const user: usuarios | null = await prisma.usuarios.findUnique({
    where: {
      usuario: email,
    },
  });
  if (!user) return null;

  const validPassword = bcrypt.compareSync(password, user.clave as string);
  return validPassword ? user : null;
}