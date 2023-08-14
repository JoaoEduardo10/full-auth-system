import { User } from "@prisma/client";

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface ILoginUserRepository {
  login(loginUser: LoginUserDTO): Promise<User>;
}
