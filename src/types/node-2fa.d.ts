declare module 'node-2fa' {
  export type Option = {
    name?: string;
    account?: string;
  };

  export type Secret = {
    secret: string;
    uri: string;
    qr: string;
  };

  export type TokenObject = {
    token: string;
  };

  export type Verify = {
    delta: number;
  } | null;

  export function genertateSecret(option): Secret;
  export function generateToken(secret: string): TokenObject;
  export function verifyToken(
    secret: string,
    token: string,
    window?: number
  ): Verify;
}
