import exp from 'express';
import bcpt from 'bcrypt';
import pkg from 'jsonwebtoken';
import bodyParser from 'body-parser';

import mssql from 'mssql';
import SqlServerConfig from '../config/sqlserverconfig.js';

import confirmarToken from '../middlewares/autenticar.js';
import lerPgn from '../middlewares/pgn.js';
import authConfig from '../config/authConfig.js';


const {Router} = exp;
const {compare} = bcpt;
const userRouter = Router();
const jsonParser = bodyParser.json();
const {sign} = pkg

userRouter.post('/', jsonParser, async (req, res) => {
    try{
        await mssql.connect(SqlServerConfig);

        const user = await mssql.query(`SELECT Id, Email, Senha FROM Usuario WHERE Email = '${req.body.Email}'`)

        if(!user.rowsAffected[0]){
            return res.json('Email ou senha incorretos');
        }

        const passwordMatched = await compare(req.body.Senha, user.recordset[0].Senha);

        if(!passwordMatched){
            return res.json('Email ou senha incorretos');
        }

        const {secret, expiresIn} = authConfig.jwt;

        const token = sign({}, secret, {subject: user.recordset[0].Id.toString(), expiresIn})

        return res.json({token});
    }catch(err){
        console.log(err);
    }
})

userRouter.get('/profile', confirmarToken, async (req, res) => {
    await mssql.connect(SqlServerConfig);

    const user = await mssql.query(`SELECT Nome, Email FROM Usuario WHERE Id = ${parseInt(req.userId, 10)}`);
   
    if(!user.rowsAffected[0]){
        return res.json('Usuário não encontrado');
    }

    const profile = user.recordset[0];

    return res.json(profile)
})

userRouter.post('/pgn', confirmarToken, lerPgn, async(req, res) => {
    //res.send(req.info);
    res.send(req.movimentos);

    await mssql.connect(SqlServerConfig);

    const mov = await mssql.query(`INSERT INTO teste (mov) VALUES ('${req.movimentos}')`);
})

export default userRouter;