import { Router } from 'express';
import { actualizarMantenimiento, listarMantenimientos, registrarMantenimiento } from '../controllers/mantenimiento.controllers.js';
import { validarToken } from '../controllers/autenticacion.controllers.js';
import { validatorMante } from '../validation/validatorMantenimiento.js';

const mantenimientoRouter = Router();

mantenimientoRouter.post('/registrar', validarToken, validatorMante, registrarMantenimiento);
mantenimientoRouter.get('/listar', listarMantenimientos);
mantenimientoRouter.put('/actualizar/:id', validarToken, validatorMante, actualizarMantenimiento);

export default mantenimientoRouter;
