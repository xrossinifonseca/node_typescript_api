/*
  Warnings:

  - You are about to drop the `stockentries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stockout` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `stockentries` DROP FOREIGN KEY `StockEntries_productId_fkey`;

-- DropForeignKey
ALTER TABLE `stockout` DROP FOREIGN KEY `StockOut_productId_fkey`;

-- DropTable
DROP TABLE `stockentries`;

-- DropTable
DROP TABLE `stockout`;
