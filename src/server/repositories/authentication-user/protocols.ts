import { User } from "@prisma/client";

export interface IUserAuthenticationRepository {
  authentication({ id }: { id: string }): Promise<User>;
}
