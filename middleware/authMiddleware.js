import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Verificar el token de acceso en la solicitud
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(401).json({ error: 'Token de acceso no proporcionado' });
  }

  try {
    // Validar el formato del token
    const tokenParts = accessToken.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      throw new Error('Formato de token inválido');
    }

    // Verificar y decodificar el token utilizando el token almacenado en el localStorage
    const storedAccessToken = localStorage.getItem('access_token');
    const decodedToken = jwt.verify(tokenParts[1], storedAccessToken);
    req.user = decodedToken; // Almacenar la información del usuario en la solicitud
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token de acceso caducado' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Token de acceso inválido' });
    } else {
      return res.status(500).json({ error: 'Error de autenticación' });
    }
  }
};

export default authMiddleware;
