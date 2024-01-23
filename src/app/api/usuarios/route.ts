import prisma from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const usuarios = await prisma.usuarios.findMany({
      select: {
        id: true,
        nombre: true,
        usuario: true,
        usuario_agua_clientes: {
          select: {
            id: true,
            id_agua: true,
            direccion: true,
            usuario_id: true,
          }
        },
        usuarios_roles: {
          select: {
            rol_id: true,
            usuario_id: true,
          }
        }
      },
    });

    return NextResponse.json(usuarios);
  } catch (error) {
    console.error("Error fetching usuarios:", error);
    return NextResponse.json({ error: "Error fetching usuarios" });
  }
}
