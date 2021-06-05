import {Router} from 'express';
import {hash} from 'bcrypt';
import bodyParser from 'body-parser';

import mssql from 'mssql';
import SqlServerConfig from '../config/sqlserverconfig.js';

const registerRouter = Router();
const jsonParser = bodyParser.json();

registerRouter.post('/', jsonParser, async(req, res) => {
    try{
        await mssql.connect(SqlServerConfig);

        const userExists = await mssql.query(`SELECT 1 FROM Usuario WHERE Email = '${req.body.Email}'`)

        if(userExists.rowsAffected[0]){
            return res.json('Usuário já cadastrado');
        }

        const hashedPassword = await hash(req.body.Senha, 8);

        await mssql.query(`INSERT INTO Usuario (Nome, Email, Senha) VALUES ('${req.body.Nome}', '${req.body.Email}', '${hashedPassword}')`);

        return es.json('Usuário cadastrado com sucesso');
    }catch(err) {
        console.log(err);
    }
});

export default registerRouter;