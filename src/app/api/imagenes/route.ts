import prisma from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  const imagenes = await prisma.imagenes.findMany({
    select: {
      id: true,
      nombre: true,
      archivo: true,
      url: true,
    },
  });

  return NextResponse.json(imagenes);
}
