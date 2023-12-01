import { check, validationResult } from 'express-validator';

const validacionArea = [
    check('nombre').exists().withMessage('El nombre es requerido')
        .not().isEmpty().withMessage('El nombre no puede estar vacío')
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres')
        .matches(/^[a-zA-Z\s]*$/).withMessage('El nombre solo puede contener letras y espacios')
        .trim().withMessage('No se permiten espacios al inicio o al final')
        .escape().withMessage('No se permiten caracteres especiales')
        .whitelist('a-zA-Z\s').withMessage('El nombre solo puede contener letras y espacios')
        .customSanitizer(value => {
            return value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        }).withMessage('No se permiten etiquetas de script'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default validacionArea;
