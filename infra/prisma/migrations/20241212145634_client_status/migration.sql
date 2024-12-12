-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';
