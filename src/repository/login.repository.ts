import prisma from "../db/db";

const login = async (username: string) => {
  return prisma.admin.findUnique({ where: { username } }) || null;
};

export { login };
