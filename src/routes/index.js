import {Router} from 'express';

import registerRouter from './register.routes.js';
import userRouter from './user.routes.js';

const routes = Router();

routes.use('/register', registerRouter);
routes.use('/login', userRouter);

export default routes;