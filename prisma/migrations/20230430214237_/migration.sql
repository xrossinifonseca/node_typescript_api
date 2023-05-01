/*
  Warnings:

  - You are about to alter the column `validity` on the `stock` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(3)` to `Timestamp(0)`.

*/
-- AlterTable
ALTER TABLE `stock` MODIFY `validity` TIMESTAMP(0) NOT NULL;
