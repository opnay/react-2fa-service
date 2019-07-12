export type TokenData = {
  service: string;
  name: string;
};

export type TokenType = TokenData & {
  secret: string;
};
