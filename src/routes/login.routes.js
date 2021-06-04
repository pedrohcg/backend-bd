import {Router} from 'express';
import {compare} from 'bcrypt';
import pkg from 'jsonwebtoken';
import bodyParser from 'body-parser';

import mssql from 'mssql';
import SqlServerConfig from '../config/sqlserverconfig.js';

const loginRouter = Router();
const jsonParser = bodyParser.json();
const {sign} = pkg

loginRouter.post('/', jsonParser, async (req, res) => {
    try{
        await mssql.connect(SqlServerConfig);

        const user = await mssql.query(`SELECT Id, Email, Senha FROM Usuario WHERE Email = '${req.body.Email}'`)

        if(!user.rowsAffected[0]){
            throw new Error('email ou senha incorretos');
        }

        const passwordMatched = await compare(req.body.Senha, user.recordset[0].Senha);

        if(!passwordMatched){
            throw new Error('email ou senha incorretos');
        }

        const token = sign({}, 'owqdnindqpndao', {subject: user.recordset[0].Id.toString(), expiresIn: '1d'})

        console.log(token)

        res.send('Usuário logado');
    }catch(err){
        console.log(err);
    }
})

export default loginRouter;