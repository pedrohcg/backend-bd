import pkg from 'express';

import registerRouter from './register.routes.js';
import userRouter from './user.routes.js';
import partidasRouter from './partidas.routes.js'

const {Router} = pkg;
const routes = Router();

routes.use('/register', registerRouter);
routes.use('/user', userRouter);
routes.use('/partidas', partidasRouter);

export default routes;
