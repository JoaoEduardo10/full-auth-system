import { AuthGoogle } from "../services/auth-google";

const configurePassport = () => {
  const authGoogle = new AuthGoogle();

  authGoogle.auth();
};

export { configurePassport };
