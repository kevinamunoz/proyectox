import { Router } from 'express';
import { actualizarArea, buscarAreaPorId, listarArea, registrarArea } from '../controllers/area.controllers.js';
import { validarToken } from '../controllers/autenticacion.controllers.js';
import validacionArea from '../validation/validatorarea.js';

const areaRouter = Router();

areaRouter.get('/listar', listarArea);
areaRouter.post('/registrar', validarToken, validacionArea, registrarArea);
areaRouter.get('/buscar/:id', validarToken, buscarAreaPorId);
areaRouter.put('/actualizar/:id', validarToken, validacionArea, actualizarArea);

export default areaRouter;