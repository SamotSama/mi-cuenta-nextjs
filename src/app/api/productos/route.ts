import prisma from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  const productos = await prisma.productos.findMany({
    select: {
      nombre: true,
      cuit: true,
      direccion: true,
      localidad: true,
      provincia: true,
      telefono: true,
      whatsapp: true,
    },
  });
  return NextResponse.json(productos);
}
