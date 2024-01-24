import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { dni, archivo1, archivo2 } = req.body;

      // Realiza la lógica necesaria para almacenar los datos en la base de datos (usando Prisma)
      const result = await prisma.friocalor.create({
        data: {
          id: dni,
          dnia: archivo1,
          dnib: archivo2,
        },
      });

      res.status(200).json({ success: true, result });
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Método no permitido' });
  }
}