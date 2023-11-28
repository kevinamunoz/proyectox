import { Router } from 'express';
import { validarUsuario } from '../controllers/autenticacion.controllers.js';

const auRouter = Router();

auRouter.post('/validar', validarUsuario);
export default auRouter;
