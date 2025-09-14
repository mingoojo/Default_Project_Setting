export type CreateUserKeyReqType = {
  secret_key: string;
  api_key: string;
  user_fk: number;
  key_name: string;
  flag: string;
};

export type GetUserKeyReqType = {
  secretKey: string;
  apiKey: string;
};
