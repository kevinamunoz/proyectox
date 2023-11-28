import { check } from 'express-validator';

export const validatorMaqui = [
    check('nombre', 'El nombre es requerido').isLength({ max: 50 }).notEmpty(),
    check('marca', 'La marca es requerida').isLength({ max: 50 }).notEmpty(),
    check('placa', 'La placa es requerida').isLength({ max: 50 }).notEmpty(),
    check('modelo', 'El modelo es requerido').isLength({ max: 50 }).notEmpty(),
    check('cantidad', 'La cantidad es requerida y debe ser numérica').isLength({ max: 10 }).notEmpty().isNumeric(),
    check('manual', 'El manual es requerido').isLength({ max: 50 }).notEmpty(),
    check('serial', 'Serial requerido').isLength({ max: 50 }).notEmpty(),
    check('descripcion', 'La descripción de la máquina es requerida').isLength({ max: 50 }).notEmpty(),
    check('estado', 'Estado incorrecto, debe ser "activo", "inactivo" o "reparacion"').isIn(['activo', 'inactivo', 'reparacion']),
    check('id_usuario', 'ID de usuario requerido y debe ser numérico').isLength({ max: 50 }).notEmpty().isNumeric(),
    check('id_area', 'ID de área requerido y debe ser numérico').isLength({ max: 50 }).notEmpty().isNumeric(),
    check('id_ambiente', 'Ambiente requerido y debe ser numérico').isLength({ max: 50 }).notEmpty().isNumeric(),
];
