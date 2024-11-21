/*
  Warnings:

  - You are about to drop the column `atualizadoEm` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `cargo` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `criadoEm` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `dataNascimento` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoFisico` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `estadoCivil` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `membrosFamilia` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `numeroPessoal` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `profissao` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `salario` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `clientes` table. All the data in the column will be lost.
  - Added the required column `address` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `familyMembersAmount` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobPosition` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobTitle` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maritalStatus` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalPhoneNumber` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "atualizadoEm",
DROP COLUMN "cargo",
DROP COLUMN "criadoEm",
DROP COLUMN "dataNascimento",
DROP COLUMN "descricao",
DROP COLUMN "enderecoFisico",
DROP COLUMN "estadoCivil",
DROP COLUMN "membrosFamilia",
DROP COLUMN "nome",
DROP COLUMN "numeroPessoal",
DROP COLUMN "profissao",
DROP COLUMN "salario",
DROP COLUMN "telefone",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "familyMembersAmount" INTEGER NOT NULL,
ADD COLUMN     "jobPosition" TEXT NOT NULL,
ADD COLUMN     "jobTitle" TEXT NOT NULL,
ADD COLUMN     "maritalStatus" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "personalPhoneNumber" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "salary" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
