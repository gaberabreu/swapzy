type RegisterRequestData = {
  email: string;
  password: string;
};

type LoginRequestData = {
  email: string;
  password: string;
};

type TokenResponseData = {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  tokenType: string;
};
