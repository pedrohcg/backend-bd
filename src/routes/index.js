import {Router} from 'express';

import registerRouter from './register.routes.js';
import userRouter from './user.routes.js';
import preencherAberturasRouter from './preencheraberturas.routes.js';

const routes = Router();

routes.use('/register', registerRouter);
routes.use('/login', userRouter);
routes.use('/fill', preencherAberturasRouter);

export default routes;