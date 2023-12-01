import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import auRouter from './src/router/autenticacion.routes.js';
import usuarioRouter from './src/router/usuario.routes.js';
import maquinaRouter from './src/router/maquina.routes.js';
import mantenimientoRouter from './src/router/mantenimiento.routes.js';
import ambienteRouter from './src/router/ambiente.routes.js';
import areaRouter from './src/router/area.routes.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.get('/documents', (req, res) => {
    res.render('index.ejs');
});

// Sirve archivos estáticos desde la carpeta 'public'.
app.use(express.static('./public'));

// Agrega una ruta para servir el archivo 'index.html'.
app.get('/', (req, res) => {
    res.sendFile('./public/index.html');
});

app.use(auRouter);
app.use('/usuario', usuarioRouter);
app.use('/maquina', maquinaRouter);
app.use('/mantenimiento', mantenimientoRouter);
app.use('/ambiente', ambienteRouter);
app.use('/area', areaRouter);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
