-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "enderecoFisico" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "facebook" TEXT,
    "instagram" TEXT,
    "whatsapp" TEXT,
    "numeroPessoal" TEXT NOT NULL,
    "profissao" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "salario" DOUBLE PRECISION NOT NULL,
    "estadoCivil" TEXT NOT NULL,
    "membrosFamilia" INTEGER NOT NULL,
    "descricao" TEXT,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");
