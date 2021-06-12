import parser from 'chess-pgn-parser';
import fs from 'fs';
import bodyParser from 'body-parser';

const jsonParser = bodyParser.json();

export default function lerPgn(req, res, next){
    fs.readFile(req.body.arquivo, 'utf8', (err, data) => {
        if(err){
            return console.log(err);
        }

        const jogo = JSON.parse(parser.pgn2json(data));
        const info = jogo.str;
        const movimentos = jogo.moves

        req.info = info;
        req.movimentos = movimentos;

        return next();
    })
};