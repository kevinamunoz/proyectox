import { check, validationResult } from 'express-validator';

const validateUsuario = [

    check('identificacion')
    .exists().withMessage('La identificación es requerida')
    .isNumeric().withMessage('La identificación debe ser numérica')
    .isLength({ min: 8, max: 10 }).withMessage('La identificación debe tener entre 8 y 10 caracteres')
    .matches(/^[0-9]+$/).withMessage('La identificación solo puede contener números')
    .not().isEmpty().withMessage('La identificación no puede estar vacía'),

    check('nombres')
        .exists().withMessage('El nombre es requerido')
        .not().isEmpty().withMessage('El nombre no puede estar vacío')
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres')
        .matches(/^[a-zA-Z\s]*$/).withMessage('El nombre solo puede contener letras y espacios')
        .trim().withMessage('No se permiten espacios al inicio o al final')
        .escape().withMessage('No se permiten caracteres especiales')
        .blacklist('~!@#$%^&*()_+=`{}[]:;\'<>,.?/\\|"').withMessage('Caracteres no permitidos en el nombre')
        .customSanitizer(value => {
            return value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        }).withMessage('No se permiten etiquetas de script'),

    check('apellidos')
        .exists().withMessage('Los apellidos son requeridos')
        .not().isEmpty().withMessage('Los apellidos no pueden estar vacíos')
        .isLength({ min: 2, max: 50 }).withMessage('Los apellidos deben tener entre 2 y 50 caracteres')
        .matches(/^[a-zA-Z\s]*$/).withMessage('Los apellidos solo pueden contener letras y espacios')
        .trim().withMessage('No se permiten espacios al inicio o al final')
        .escape().withMessage('No se permiten caracteres especiales')
        .blacklist('~!@#$%^&*()_+=`{}[]:;\'<>,.?/\\|"').withMessage('Caracteres no permitidos en los apellidos')
        .customSanitizer(value => {
            return value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        }).withMessage('No se permiten etiquetas de script'),

    check('telefono')
        .exists().withMessage('El número de teléfono es requerido')
        .not().isEmpty().withMessage('El número de teléfono no puede estar vacío')
        .isLength({ min: 10, max: 15 }).withMessage('El número de teléfono debe tener entre 10 y 15 caracteres')
        .matches(/^[\d\s\-()+]+$/).withMessage('Formato de número de teléfono no válido. Solo se permiten dígitos, espacios, guiones y paréntesis.')
        .trim().withMessage('No se permiten espacios al inicio o al final')
        .escape().withMessage('No se permiten caracteres especiales'),

    check('correo')
        .exists().withMessage('El correo electrónico es requerido')
        .not().isEmpty().withMessage('El correo electrónico no puede estar vacío')
        .isEmail().withMessage('El formato del correo electrónico no es válido')
        .trim().withMessage('No se permiten espacios al inicio o al final')
        .normalizeEmail().withMessage('El correo electrónico no es válido')
        .blacklist(['~', '!', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '`', '{', '}', '[', ']', ':', ';', '\'', '<', '>', ',', '?', '/']).withMessage('Caracteres no permitidos en el correo electrónico'),

    check('estado')
        .exists().withMessage('El estado es requerido')
        .isIn(['activo', 'inactivo']).withMessage('El estado debe ser "activo" o "inactivo"'),

    check('rol')
        .exists().withMessage('El rol es requerido')
        .isIn(['administrador', 'tecnico', 'usuario']).withMessage('El rol debe ser "administrador", "tecnico" o "usuario"'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default validateUsuario;