import {Router} from 'express';

import registerRouter from './register.routes.js';
import loginRouter from './login.routes.js';

const routes = Router();

routes.use('/register', registerRouter);
routes.use('/login', loginRouter);

export default routes;