-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('customer', 'seller');

-- CreateEnum
CREATE TYPE "DeliveriesStatus" AS ENUM ('processing', 'shipped', 'delivered');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'customer',
ALTER COLUMN "updated_at" DROP NOT NULL;

-- CreateTable
CREATE TABLE "deliveries" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "DeliveriesStatus" NOT NULL DEFAULT 'processing',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "deliveries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deliveries_logs" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deliverie_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "deliveries_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries_logs" ADD CONSTRAINT "deliveries_logs_deliverie_id_fkey" FOREIGN KEY ("deliverie_id") REFERENCES "deliveries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
