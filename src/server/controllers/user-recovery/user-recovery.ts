/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { User } from "@prisma/client";
import { ApiRequest, ApiResponse, IControllers } from "../protocols";
import { IUserPasswordRecoveryRepository } from "../../repositories/user-recovery/protocols";
import { createCrypt } from "../../utils/bcryptjs";

class UserPasswordRecoveryRepository implements IControllers {
  constructor(
    private readonly userPasswordRecoveryRepository: IUserPasswordRecoveryRepository
  ) {}

  async handle(req: ApiRequest): Promise<ApiResponse<User>> {
    const { password } = req.body!;
    const userId = req.params.userId as string;

    const new_password = await createCrypt(password);

    const user = await this.userPasswordRecoveryRepository.recovery({
      id: userId,
      password: new_password,
    });

    return {
      body: user,
      statusCode: 204,
    };
  }
}

export { UserPasswordRecoveryRepository };
