import exp from 'express';

import mssql from 'mssql';
import SqlServerConfig from '../config/sqlserverconfig.js';

const {Router} = exp;
const setupRouter = Router();

setupRouter.post('/', async (req, res) => {
    await mssql.connect({
    "user": "SA",
    "password": "<YourStrong@Passw0rd>",
    "server": "localhost",
    "database": "master",
    "trustServerCertificate": true,
    "encrypt": true
    });

    await mssql.query(`
        CREATE DATABASE Chess_Viewer
    `)

    await mssql.query(`
        USE Chess_Viewer

        CREATE TABLE Aberturas (
            Id INT IDENTITY,
            Nome_Abertura VARCHAR(50) NOT NULL,
            Movimentos_Abertura VARCHAR(250) NOT NULL,
            CONSTRAINT PK1 PRIMARY KEY (Id) 
        )

        CREATE TABLE Partidas (
            Id INT IDENTITY,
            Resultado VARCHAR(3) NOT NULL,
            Evento VARCHAR(50) NOT NULL,
            Website VARCHAR(50),
            DataEvento DATETIME NOT NULL,
            Id_Abertura INT NOT NULL,
            Jogador_Brancas VARCHAR(255) NOT NULL,
            Jogador_Pretas VARCHAR(255) NOT NULL,
            Quantidade_Movimentos VARCHAR(4) NOT NULL,
            Movimentos VARCHAR(4000) NOT NULL,
            CONSTRAINT PK2 PRIMARY KEY CLUSTERED(Id),
            CONSTRAINT FK1 FOREIGN KEY (Id_Abertura) REFERENCES Aberturas(Id)
        )

        CREATE TABLE Usuario (
            Id INT IDENTITY,
            Nome VARCHAR(255) NOT NULL,
            Email VARCHAR(255) NOT NULL UNIQUE,
            Senha VARCHAR(255) NOT NULL,
            CONSTRAINT PK3 PRIMARY KEY (Id)
        )

        CREATE TABLE Jogos_Favoritos (
            Id_Usuario INT,
            Id_Partida INT,
            CONSTRAINT FK2 FOREIGN KEY (Id_Usuario) REFERENCES Usuario(Id),
            CONSTRAINT FK3 FOREIGN KEY (Id_Partida) REFERENCES Partidas(Id)
        )
    `
    )

    await mssql.query(`
        USE Chess_Viewer

        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Desconhecida', 'desconhecido')

        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Bishops Opening', 'e4,e5,Bc4')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Vienna Game', 'e4,e5,Nc3')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Kings Gambit', 'e4,e5,f4')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Philidor Defense', 'e4,e5,Nf3,d6')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Petrovs Defense', 'e4,e5,Nf3,Nf6')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Scotch Game', 'e4,e5,Nf3,Nc6,d4')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Italian Game', 'e4,e5,Nf3,Nc6,Bc4')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Giuoco Piano', 'e4,e5,Nf3,Nc6,Bc4,Bc5')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Two Knights Defense', 'e4,e5,Nf3,Nc6,Bc4,Nf6')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Ruy Lopez', 'e4,e5,Nf3,Nc6,Bb5')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Center Game', 'e4,e5,d4,exd4,Qxd4')

        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Sicilian Defense', 'e4,c5')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('French Defense', 'e4,e6')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Caro–Kann Defense', 'e4,c6')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Alekhines Defense', 'e4,Nf6')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Pirc Defense', 'e4,d6,d4,Nf6,Nc3')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Modern Defense', 'e4,g6')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Scandinavian Defense', 'e4,d5')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Nimzowitsch Defense', 'e4,Nc6')

        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Closed Game', 'd4,d5')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Queens Gambit', 'd4,d5,c4')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Queens Gambit Declined', 'd4,d5,c4,e6')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Slav Defense', 'd4,d5,c4,c6')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Queens Gambit Accepted', 'd4,d5,c4,dxc4')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Colle System', 'd4,d5,Nf3,Nf6,e3')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Torre Attack', 'd4,d5,Nf3,Nf6,Bg5')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('London System', 'd4,d5,Nf3,Nf6,Bf4')

        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Indian Defense', 'd4,Nf6')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Nimzo-Indian Defense', 'd4,Nf6,c4,e6,Nc3,Bb4')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Kings Indian Defense', 'd4,Nf6,c4,g6,Nc3,Bg7')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Grünfeld Defense', 'd4,Nf6,c4,g6,Nc3,d5')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Queens Indian Defense', 'd4,Nf6,c4,e6,Nf3,b6')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Modern Benoni', 'd4,Nf6,c4,c5,d5,e6')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Budapest Gambit', 'd4,Nf6,c4,e5')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Old Indian Defense', 'd4,Nf6,c4,d6')

        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Dutch Defense', 'd4,f5')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Benoni Defense', 'd4,Nf6,c4,c5,d5')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Réti Opening', 'Nf3,d5,c4')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('English Opening', 'c4')
        INSERT INTO Aberturas (Nome_Abertura, Movimentos_Abertura) VALUES('Birds Opening', 'f4')
    `)

    return res.json('Ligma')
});


export default setupRouter;
