import pkg from 'express';
import parser from 'chess-pgn-parser';

import mssql from 'mssql';
import SqlServerConfig from '../config/sqlserverconfig.js';

const {Router} = pkg;

const preencherAberturasRouter = Router();

preencherAberturasRouter.post('/', async (req, res) => {
    try{
        await mssql.connect(SqlServerConfig);

        const dadosExistem = await mssql.query(`SELECT 1 FROM Aberturas`);

        if(!dadosExistem.rowsAffected[0]){
            console.log(parser.pgn2json("bishop.pgn")) 
        }
    }catch(err){
        console.log(err);
    }
});

export default preencherAberturasRouter;