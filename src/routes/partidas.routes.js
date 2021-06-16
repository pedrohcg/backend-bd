import exp from 'express';
import bodyParser from 'body-parser';

import mssql from 'mssql';
import SqlServerConfig from '../config/sqlserverconfig.js';

import confirmarToken from '../middlewares/autenticar.js';
import lerPgn from '../middlewares/pgn.js';

const {Router} = exp;
const partidasRouter = Router();
const jsonParser = bodyParser.json();

partidasRouter.post('/procurar',jsonParser, confirmarToken, async (req, res) => {
    await mssql.connect(SqlServerConfig);
    
    const resposta = await mssql.query(`
    SELECT P.Id, P.Resultado, P.Evento, P.Website, P.DataEvento, P.Jogador_Brancas, P.Jogador_Pretas, P.Quantidade_Movimentos
        FROM Partidas P
        INNER JOIN Aberturas A
        ON P.Id_Abertura = A.Id
    WHERE P.Resultado = '${req.body.searchParam}'
    OR P.DataEvento = '${req.body.searchParam}'
    OR P.Jogador_Pretas = '${req.body.searchParam}'
    OR P.Jogador_Brancas = '${req.body.searchParam}'
    OR P.Quantidade_Movimentos = ${req.body.searchParam}
    OR P.Website = '${req.body.searchParam}'
    OR A.Nome_Abertura = '${req.body.searchParam}' 
    
    `)

    res.send(resposta.recordset); 
    
})

partidasRouter.post('/cadastrar', jsonParser, confirmarToken, lerPgn, async (req, res) => {
    await mssql.connect(SqlServerConfig);

    const partidaJaExiste = await mssql.query(`
        SELECT 1 
        FROM Partidas
        WHERE Movimentos = '${req.movimentos}'
    `)

    if(partidaJaExiste.rowsAffected[0]){
        return res.json('Partida já registrada no banco de dados')
    }

    const qtdMovimentos = Math.ceil(req.movimentos.length/2);

    const determinarAbertura = await mssql.query(`
        DECLARE @id_abertura INT;
        
        SELECT @id_abertura = Id FROM Aberturas
        WHERE '${req.movimentos}' LIKE (Movimentos_Abertura + '%') 
        
        if(@id_abertura IS NULL)
        BEGIN
            SET @id_abertura = 1
        END 
        
        SELECT @id_abertura AS ID
    `)

    const idAbertura = determinarAbertura.recordset[0].ID

    await mssql.query(`
        INSERT INTO Partidas (Resultado,Evento,Website,DataEvento,Id_Abertura,Jogador_Brancas,Jogador_Pretas,Quantidade_Movimentos,Movimentos)
        VALUES ('${req.info.Result}','${req.info.Event}','${req.info.Site}','${req.info.Date}', ${idAbertura},'${req.info.White}','${req.info.Black}',
        '${qtdMovimentos}','${req.movimentos}')`);

   res.send("Partida Salva");
})

partidasRouter.post('/favoritar', jsonParser, confirmarToken, async (req, res) => {
    await mssql.connect(SqlServerConfig);

    const partidaValida = await mssql.query(`
        SELECT 1 FROM Partidas WHERE Id = ${req.body.idPartida}
    `);

    if(!partidaValida.rowsAffected[0]){
        return res.json('Partida Inválida')
    }

    const partidaJaFavoritada = await mssql.query(`
        SELECT 1 FROM Jogos_Favoritos
        WHERE Id_Usuario = ${req.userId}
        AND Id_Partida = ${req.body.idPartida}
    `)

    if(partidaJaFavoritada.rowsAffected[0]){
        return res.json('Partida já adicionada as favoritas');
    }

    await mssql.query(`
        INSERT INTO Jogos_Favoritos (Id_Usuario, Id_Partida) VALUES (${req.userId}, ${req.body.idPartida})
    `);

    res.send("Partida adicionada aos favoritos");
});

partidasRouter.get('/favoritar', confirmarToken, async (req, res) => {
    await mssql.connect(SqlServerConfig);

    const favoritos = await mssql.query(`
        SELECT P.Id, P.Resultado, P.Evento, P.Website, P.DataEvento, A.Nome_Abertura, P.Jogador_Brancas, P.Jogador_Pretas, P.Quantidade_Movimentos
        FROM Usuario U
        INNER JOIN Jogos_Favoritos JF ON U.Id = JF.Id_Usuario
        INNER JOIN Partidas P ON JF.Id_Partida = P.Id 
        INNER JOIN Aberturas A ON A.Id = P.Id_Abertura
        WHERE U.Id = ${req.userId}
    `)

    res.send(favoritos.recordset)
});

partidasRouter.get('/movimentos', jsonParser, confirmarToken, async (req, res) => {
    await mssql.connect(SqlServerConfig);

    const mov = await mssql.query(`
        SELECT Movimentos
        FROM Partidas P
        WHERE P.Id = ${req.body.idPartida} 
    `);

    const array = mov.recordset[0].Movimentos.split(',');

    res.send(array)
})

export default partidasRouter;