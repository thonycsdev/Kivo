/*
  Warnings:

  - Added the required column `sellingPotentialTag` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SellingPotential" AS ENUM ('Interessado', 'EmNegociacao', 'AltaProbabilidade', 'Perdido', 'ContratoAssinado');

-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "sellingPotentialTag" "SellingPotential" NOT NULL;
