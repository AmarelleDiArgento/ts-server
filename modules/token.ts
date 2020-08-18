import jwt from 'jsonwebtoken';

export default class Token {
    private static semilla: string = 'pruebasdeToken';
    private static duracion: string = '1h';

    constructor() { }

    static optenerToken(payload: any): string {
        return jwt.sign(
            { usuario: payload },
            this.semilla,
            { expiresIn: this.duracion }
        );
    }

    static comprobarToken(userToken: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(userToken, this.semilla, (err, decoded) => {
                (err) ? reject() : resolve(decoded);
            })
        })
    }
}