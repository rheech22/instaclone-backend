import { PrismaClient } from "@prisma/client";

// 프리즈마 클라이언트는 작성된 스키마에 따라 생성됨
const client = new PrismaClient();

export default client;