// import { NextRequest, NextResponse } from "next/server";
// import prisma from "../../../../prisma/client";

// function replacer(key: string, value: any): any {
//   if (typeof value === "bigint") {
//     return value.toString();
//   }
//   return value;
// }

// export async function GET(request: NextRequest, response: NextResponse) {
//   try {
//     const productos = await prisma.productos.findMany({
//       select: {
//         id: true,
//         nombre: true,
//         precio: true,
//         orden: true,
//         presentacion: {
//           select: {
//             nombre: true,
//           },
//         },
//         imagenes: {
//           select: {
//             url: true,
//           },
//         },
//       },
//     });

//     // Convertir BigInt a String usando replacer
//     const productosStringified = JSON.stringify(productos, replacer);

//     if (!productosStringified) {
//       return NextResponse.json({ error: 'Productos no encontrados' }, { status: 404 });
//     }

//     return NextResponse.json(JSON.parse(productosStringified));
//   } catch (error: any) {
//     console.error("Error al obtener los datos:", error);
//     return NextResponse.json({ error: 'Error interno del servidor', details: error.message || 'Sin detalles proporcionados.' }, { status: 500 });
//   }
// }
