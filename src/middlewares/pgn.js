import parser from 'chess-pgn-parser';
import fs from 'fs';

export default function lerPgn(req, res, next){
    fs.readFile('lSigl_vs_PS_Laplace_2021.05.15.pgn', 'utf8', (err, data) => {
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