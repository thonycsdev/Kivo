/*
  Warnings:

  - You are about to drop the column `salary` on the `clientes` table. All the data in the column will be lost.
  - Added the required column `grossIncome` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasFGTS` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasFinancing` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `netIncome` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "salary",
ADD COLUMN     "grossIncome" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "hasFGTS" BOOLEAN NOT NULL,
ADD COLUMN     "hasFinancing" BOOLEAN NOT NULL,
ADD COLUMN     "netIncome" DOUBLE PRECISION NOT NULL;
