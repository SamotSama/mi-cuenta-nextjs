import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

function replacer(key: string, value: any): any {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
}

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const imagenes = await prisma.imagenes.findMany({
      // select: {
      //   id: true,
      //   nombre: true,
      //   usuario: true,
      //   usuario_agua_clientes: {
      //     select: {
      //       id: true,
      //       id_agua: true,
      //       direccion: true,
      //       usuario_id: true,
      //     },
      //   },
      //   usuarios_roles: {
      //     select: {
      //       rol_id: true,
      //       usuario_id: true,
      //     },
      //   },
      // },
    });

    // Convertir BigInt a String usando replacer
    const imgStringified = JSON.stringify(imagenes, replacer);

    if (!imgStringified) {
      return NextResponse.json({ error: 'Imagenes no encontradas' }, { status: 404 });
    }

    return NextResponse.json(JSON.parse(imgStringified));
  } catch (error: any) {
    console.error("Error al obtener los datos:", error);
    return NextResponse.json({ error: 'Error interno del servidor', details: error.message || 'Sin detalles proporcionados.' }, { status: 500 });
  }
}
