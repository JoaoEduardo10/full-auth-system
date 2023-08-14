/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ILoginUserRepository } from "../../repositories/login-user/protocols";
import { createJwt } from "../../utils/jsonwebtoken";
import { ApiRequest, ApiResponse, IControllers } from "../protocols";

class LoginUserController implements IControllers {
  constructor(private readonly loginUserRepository: ILoginUserRepository) {}

  async handle(req: ApiRequest): Promise<ApiResponse<unknown>> {
    const { email, password } = req.body!;

    const user = await this.loginUserRepository.login({ email, password });

    const token = createJwt({
      email: user.email,
      id: user.id,
      name: user.name,
    });

    return {
      body: user,
      token,
      statusCode: 200,
    };
  }
}

export { LoginUserController };
