import { pool } from '../database/conexion.js';

export const registrarArea = async (req, res) => {
    try {
        const { nombre } = req.body;

        const sql = `
            INSERT INTO area (nombre)
            VALUES (?)
        `;

        const values = [nombre];

        const [result] = await pool.query(sql, values);

        if (result.affectedRows > 0) {
            return res.status(200).json({
                status: "200 OK",
                message: 'Area registrado con éxito',
            });
        } else {
            return res.status(400).json({
                status: "400 Bad Request",
                message: 'No se pudo registrar el area',
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "500 Internal Server Error",
            message: 'Error en el servidor' + err.message,
        });
    }
};


export const listarArea = async (req, res) => {
    try {
        const [result] = await pool.query('select * from area');
        res.status(200).json(result);
  
    } catch (e) {
        res.status(500).json({ massage: 'Error en el controlador area:' + e });
    }
  };
  
  export const buscarAreaPorId = async (req, res) => {
    try {
        const id = req.params.id;

        const sql = `
            SELECT * FROM area
            WHERE id_area = ?
        `;

        const values = [id];

        const [result] = await pool.query(sql, values);

        if (result.length > 0) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(404).json({
                status: "404 Not Found",
                message: 'No se encontró el area',
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "500 Internal Server Error",
            message: 'Error en el servidor' + err.message,
        });
    }
};

export const actualizarArea = async (req, res) => {
    try{ 
        let id = req.params.id;
        let{nombre} =req.body;

        let sql = `UPDATE area SET nombre=? WHERE id_area=?`;
        const [rows] = await pool.query(sql, [nombre, id]);        
        
        if (rows.affectedRows > 0)
            return res.status(200).json({ 
                'status':"200 OK",
                'message':'Se actualizo con exito el area',
            });
        else
            return res.status(401).json({ 
                'status':"401 Not Found",
                'message':'No se actualizo el area' 
            });
    } catch (err) {
        res.status(500).json({
            'status':"500 Internal Server Error",
            'message':'Error en el servidor' + err.message,
        });
    }
};
