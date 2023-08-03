/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { User } from "@prisma/client";
import { ICreateUserRepository } from "../repositories/protocols";
import { ApiRequest, ApiResponse, IControllers } from "./protocols";
import { createCrypt } from "../utils/bcryptjs";
import { createJwt } from "../utils/jsonwebtoken";

export class CreateUserController implements IControllers {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(req: ApiRequest): Promise<ApiResponse<User>> {
    const { user: user_req, body } = req;

    if (user_req) {
      const { displayName: name, email } = user_req;

      const password = await createCrypt(email);

      const user = await this.createUserRepository.create({
        email,
        name,
        password,
        status: "authenticated",
      });

      const token = createJwt({
        email: user.email,
        id: user.id,
        name: user.name,
      });

      return {
        body: user,
        token,
        statusCode: 201,
      };
    }

    const { email, name, password, status } = body!;

    const passwordHash = await createCrypt(password);

    const user = await this.createUserRepository.create({
      email,
      name,
      password: passwordHash,
      status,
    });

    return {
      body: user,
      statusCode: 201,
    };
  }
}
