import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const getData = async (serverIp: string, accessToken: string) => {
  const url = `https://micuenta.somoselagua.com.ar/micuenta/empresa/empresa`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error in request: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error in request: ${error.message}`);
    } else {
      throw new Error(`Unknown error in request`);
    }
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end(); // Unauthorized
  }

  const { serverIp, access_token } = session;

  try {
    const data = await getData(serverIp, access_token);

    return res.json(data);
  } catch (error) {
    console.error('Error during request:', error);
    return res.status(500).end(); // Internal Server Error
  }
}