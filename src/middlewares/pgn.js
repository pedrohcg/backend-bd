import parser from 'chess-pgn-parser';

export default function lerPgn(req, res, next){
        const jogo = JSON.parse(parser.pgn2json(req.body.data));
        const info = jogo.str;
        const movimentos = jogo.moves

        req.info = info;
        req.movimentos = movimentos;

        return next();
};
