import express from 'express';
import pkg from 'jsonwebtoken';
import authConfig from '../config/authConfig.js';

const {verify} = pkg;

export default function confirmarToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        throw new Error('Usuário não autenticado');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const {sub} = decoded;

        req.userId = sub;

        return next();
    } catch(err){
        throw new Error('Token JWT inválido');
    }
}