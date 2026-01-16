export interface JwtSigner {
    sign(payload: { sub: string; email: string }): string;
}
