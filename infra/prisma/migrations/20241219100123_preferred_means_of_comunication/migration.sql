-- CreateEnum
CREATE TYPE "MeansOfCommunication" AS ENUM ('Whatsapp', 'Chamada');

-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "preferredMeansOfCommunication" "MeansOfCommunication" NOT NULL DEFAULT 'Whatsapp';
