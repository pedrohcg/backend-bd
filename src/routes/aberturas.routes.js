import {Router} from 'express';
import bodyParser from 'body-parser';

import mssql from 'mssql';
import SqlServerConfig from '../config/sqlserverconfig.js';

import authConfig from '../config/authConfig.js';

const userRouter = Router();
const jsonParser = bodyParser.json();

