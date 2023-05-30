/*
  Warnings:

  - You are about to drop the column `lotNumber` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `qty` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `validity` on the `product` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to drop the `stores` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `lotNumber`,
    DROP COLUMN `qty`,
    DROP COLUMN `validity`,
    MODIFY `price` DOUBLE NOT NULL;

-- DropTable
DROP TABLE `stores`;
