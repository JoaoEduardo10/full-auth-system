import { User } from "@prisma/client";

interface UserRecoveryDTO {
  password: string;
  id: string;
}

interface IUserPasswordRecoveryRepository {
  recovery(userRecovery: UserRecoveryDTO): Promise<User>;
}

export { IUserPasswordRecoveryRepository, UserRecoveryDTO };
