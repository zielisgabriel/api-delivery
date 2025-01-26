/*
  Warnings:

  - A unique constraint covering the columns `[deliverie_id]` on the table `deliveries_logs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "deliveries_logs_deliverie_id_key" ON "deliveries_logs"("deliverie_id");
