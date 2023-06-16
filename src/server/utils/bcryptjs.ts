import bcrypt from "bcryptjs";

const createCrypt = async (password: string) => {
  const salt = await bcrypt.genSalt(8);

  return await bcrypt.hash(password, salt);
};

const comparePassowrd = async (password: string, passwordHash: string) => {
  return await bcrypt.compare(password, passwordHash);
};

export { comparePassowrd, createCrypt };
