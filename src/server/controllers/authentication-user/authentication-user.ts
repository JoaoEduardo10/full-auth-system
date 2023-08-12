import { User } from "@prisma/client";
import { IUserAuthenticationRepository } from "../../repositories/authentication-user/protocols";
import { ApiRequest, ApiResponse, IControllers } from "../protocols";
import { Bad_Request } from "../../errors/api-errors";

export class UserAuthenticationController implements IControllers {
  constructor(
    private readonly userAuthenticationRepository: IUserAuthenticationRepository
  ) {}

  async handle(req: ApiRequest): Promise<ApiResponse<User>> {
    const userId = req.params.userId as string;

    const user = await this.userAuthenticationRepository.authentication({
      id: userId,
    });

    if (user.status !== "authenticated") {
      throw new Bad_Request("Usuário não autenticado.");
    }

    return {
      body: user,
      statusCode: 204,
    };
  }
}
