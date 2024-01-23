-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT,
    "usuario" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "empresa" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "cuit" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "localidad" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "whatsapp" INTEGER NOT NULL,

    CONSTRAINT "empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario_agua_clientes" (
    "id" SERIAL NOT NULL,
    "id_agua" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "direccion" TEXT NOT NULL,

    CONSTRAINT "usuario_agua_clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliente_deuda" (
    "id" SERIAL NOT NULL,
    "forma_pago" TEXT NOT NULL,
    "nrocta" INTEGER NOT NULL,
    "saldo" DECIMAL(65,30) NOT NULL,
    "enviado" BOOLEAN NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cliente_deuda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imagenes" (
    "id" SERIAL NOT NULL,
    "archivo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "imagenes_pkey" PRIMARY KEY ("id")
);
