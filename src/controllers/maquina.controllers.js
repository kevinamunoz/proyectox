import { pool } from '../database/conexion.js';
import multer from 'multer';
import{validationResult} from 'express-validator';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/img");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

export const cargarImagen = upload.single("img");

export const registrarMaquina = async (req, res) => {
    try {
        console.log(req.body)
        let error1 = validationResult(req);
        if (!error1.isEmpty()){
            return res.status(400).json(error1);
        }
        
        const { nombre, marca, placa, modelo, cantidad, manual, serial, descripcion, estado, id_usuario, id_area, id_ambiente } = req.body;
        let imagen = "";
        if(req.file !== undefined){
             imagen = req.file.originalname;

        }else{
            return res.status(400).json({
                'status': "400 Bad Request",
                'message': 'La imagen es requerida',
            });            
        }

        const sql = `INSERT INTO maquina(nombre, marca, placa, modelo, cantidad, manual, serial, imagen, descripcion, estado, id_usuario, id_area, id_ambiente)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [nombre, marca, placa, modelo, cantidad, manual, serial, imagen, descripcion, estado, id_usuario, id_area, id_ambiente];

        const [rows] = await pool.query(sql, values);

        if (rows.affectedRows > 0) {
            return res.status(200).json({
                'status': "200 OK",
                'message': 'Se registró con éxito la máquina',
            });
        } else {
            return res.status(404).json({
                'status': "404 Not Found",
                'message': 'No se registró la máquina'
            });
        }
    } catch (err) {
        res.status(500).json({
            'status': "500 Internal Server Error",
            'message': 'Error en el servidor ' + err
        });
    }
};

export const buscarMaquina = async (req, res) => {
    try {
        let id = req.params.id;
        const [result] = await pool.query(`SELECT * FROM maquina WHERE id_maquina = ${id}`);
        res.status(200).json(result[0]);

        if (rows.affectedRows > 0) {
            return res.status(200).json();
        } else {
            return res.status(404).json({
                'status': "404 Not Found",
                'message': 'No se actualizo la máquina'
            });
        }
    } catch (err) {
        res.status(500).json({
            'status': "500 Internal Server Error",
            'message': 'Error en el servidor ' + err
        });
    }
};

export const listarMaquinas = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM maquina');
        res.status(200).json(result);

    } catch (e) {
        res.status(500).json({ message: 'Error en el controlador maquina: ' + e });
    }
};

export const darDeBajaMaquina = async (req, res) => {
    let responseSent = false;
    
    try {
        const id = req.params.id;

        const sql = `
            UPDATE maquina
            SET estado_maquina = 'baja'
            WHERE id_maquina = ?
        `;

        const values = [id];

        const [result] = await pool.query(sql, values);

        if (result.affectedRows > 0) {
            return res.status(200).json({
                status: "200 OK",
                message: 'Se dio de baja la máquina con éxito',
            });
        } else {
            return res.status(404).json({
                status: "404 Not Found",
                message: 'No se encontró la máquina para dar de baja',
            });
        }
    } catch (err) {
        if (!responseSent) {
            console.error(err);
            res.status(500).json({
                status: "500 Internal Server Error",
                message: 'Error en el servidor',
            });
            responseSent = true;
        }
    }
};

export const actualizarMaquina = async (req, res) => {
    try {
        let error1 = validationResult(req);
        if (!error1.isEmpty()){
            return res.status(400).json(error1);
        }
        const id = req.params.id;
        const { nombre, marca, placa, modelo, cantidad, manual, serial, descripcion, estado, id_usuario, id_area, id_ambiente } = req.body;
        const imagen = req.file.originalname;

        const sql = `
            UPDATE maquina
            SET nombre=?, marca=?, placa=?, modelo=?, cantidad=?, manual=?, serial=?, imagen=?, descripcion=?, estado=?, id_usuario=?, id_area=?, id_ambiente=?
            WHERE id_maquina = ?
        `;
        
        const values = [nombre, marca, placa, modelo, cantidad, manual, serial, imagen, descripcion, estado, id_usuario, id_area, id_ambiente, id];

        const [result] = await pool.query(sql, values);

        if (result.affectedRows > 0) {
            return res.status(200).json({
                status: "200 OK",
                message: 'Se actualizó con éxito la máquina',
            });
        } else {
            return res.status(404).json({
                status: "404 Not Found",
                message: 'No se actualizó la máquina'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "500 Internal Server Error",
            message: 'Error en el servidor',
        });
    }
};
