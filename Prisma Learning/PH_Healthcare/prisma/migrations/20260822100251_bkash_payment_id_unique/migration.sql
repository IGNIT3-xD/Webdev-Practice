/*
  Warnings:

  - A unique constraint covering the columns `[bkashpaymentId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "bkashpaymentId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payments_bkashpaymentId_key" ON "payments"("bkashpaymentId");
