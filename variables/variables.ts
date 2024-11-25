// Variables y datos varios para no ponerlos en cada archivo

import { randomInt } from "crypto";

export const baseUrl = 'https://aura-de-cristal.vercel.app';
// export const baseUrl = 'http://localhost:4000';

export const variables_userComun = {
    email: 'aasa1ad@asd.asd',
    password: '123456Aa!',
    };


export const variables_userAdmin = {
        email: 'aasa1ad@asd.asd',
        password: '123456Aa!',
    };

export const variables_registro_existente = {
    nombre: 'Nombre1',
    apellido: 'Apellido1',
    email: 'horaciososa99+1@gmail.com',
    password: 'Asd123!'
}

// Usa random asi que a veces puede fallar
export const variables_registro_nuevo = {
    nombre: 'Nombre1',
    apellido: 'Apellido1',
    email: `horaciososa99+${randomInt(20,5000)}@gmail.com`,
    password: 'Asd123!'
}