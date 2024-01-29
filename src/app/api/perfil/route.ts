// import prisma from "../../../../prisma/client"
// import { NextRequest, NextResponse } from "next/server"

// export async function update(request: NextRequest, response: NextResponse) {
//   try {
//     const updateUser = await prisma.usuarios.update({
//       where: {
//         usuario: "viola@prisma.io",
//       },
//       data: {
//         nombre: "Viola the Magnificent" as const,
//       },
//     })
//   } catch (error: unknown) {
//     console.error(error)
//     return response.status(500).send(error.toString())
//   } finally {
//     return response
//   }
// }