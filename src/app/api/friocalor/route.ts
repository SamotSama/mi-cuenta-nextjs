import prisma from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  const friocalor = await prisma.friocalor.findMany({
    select: {
        id: true,
        dnia: true,     
        dnib: true,     
        cancelado: true,
        creado: true,   
        numero_cliente: true,
        numero_orden: true,  
    },
  });
  return NextResponse.json(friocalor);
}
