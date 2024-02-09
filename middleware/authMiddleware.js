import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Verificar el token de acceso en la solicitud
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(401).json({ error: 'Token de acceso no proporcionado' });
  }

  try {
    const decodedToken = jwt.verify(accessToken, 'tu_clave_secreta');
    req.user = decodedToken; // Almacenar la información del usuario en la solicitud
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token de acceso inválido' });
  }
};

export default authMiddleware;