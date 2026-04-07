export interface IUsersRepository {
  email: string;
  password: string;
  phoneNumber: string;
  avatar?: string;
}

export interface TokenI {
  userId: string;
  email: string;
  token: string;
  expiresAt: Date;
}

export interface CodeI {
  userId: string;
  email: string;
  code: number;
  expiresAt: Date;
}
