import prisma from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  const usuarios = await prisma.usuarios.findMany({
    select: {
      id: true,
      nombre: true,
      usuario: true,
    },
  });
  return NextResponse.json(usuarios);
}
