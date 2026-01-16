import jwt from "jsonwebtoken";
import {JwtSigner} from "../../application/auth/ports/JwtSigner";

export class JwtSignerJsonwebtoken implements JwtSigner {
    constructor(
        private readonly secret: string,
        private readonly expiresIn: string = "1h"
    ) { }

    sign(payload: { sub: string; email: string }): string {
        return jwt.sign(payload, this.secret, {expiresIn: this.expiresIn} as jwt.SignOptions);
    }
}
