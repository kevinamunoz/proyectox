import { pool } from '../database/conexion.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const validarUsuario = async (req, res) => {
  try {
    const { identificacion, contraseña } = req.body;

    const sql = 'SELECT id_usuario, nombres, rol, contraseña FROM usuario WHERE identificacion = ?';
    const [rows] = await pool.query(sql, [identificacion]);

    if (rows.length > 0) {
      const usuario = rows[0];

      // Comparar contraseñas utilizando bcrypt.compare
      const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

      if (contraseñaValida) {
        // Generar un token con información mínima del usuario
        const token = jwt.sign({ id_usuario: usuario.id_usuario, rol: usuario.rol }, process.env.AUT_SECRET, {
          expiresIn: process.env.AUT_EXPIRE,
        });

        return res.status(200).json({ token, message: 'Usuario autorizado.' });
      } else {
        return res.status(401).json({ message: 'Credenciales incorrectas.' });
      }
    } else {
      return res.status(401).json({ message: 'Usuario no encontrado.' });
    }
  } catch (error) {
    console.error('Error al validar usuario:', error);
    return res.status(500).json({ message: 'Error en el sistema.' });
  }
};

export const validarToken = (req, res, next) => {
  try {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ message: 'Se requiere el token.' });
    }

    // Extraer el token de la cadena 'Bearer <token>'
    const [bearer, tokenUsuario] = token.split(' ');
    if (bearer !== 'Bearer' || !tokenUsuario) {
      return res.status(401).json({ message: 'Formato de token inválido.' });
    }

    const decoded = jwt.verify(tokenUsuario, process.env.AUT_SECRET);
    
    // Almacenar la información del usuario decodificada en req.user para su uso posterior
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error al validar el token:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token caducado', autorizado: false });
    } else {
      return res.status(401).json({ message: 'Token inválido', autorizado: false });
    }
  }
};