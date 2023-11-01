/*
  Warnings:

  - You are about to drop the column `damagedItemId` on the `reportimg` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `reportimg` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `user` table. All the data in the column will be lost.
  - Added the required column `img_url` to the `ReportImg` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reportItemId` to the `ReportImg` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `reportimg` DROP FOREIGN KEY `ReportImg_damagedItemId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_rentId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_walletId_fkey`;

-- DropForeignKey
ALTER TABLE `wallet` DROP FOREIGN KEY `wallet_userId_fkey`;

-- AlterTable
ALTER TABLE `item` MODIFY `description` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `itemimage` ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `report` MODIFY `detail` VARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE `reportimg` DROP COLUMN `damagedItemId`,
    DROP COLUMN `img`,
    ADD COLUMN `img_url` VARCHAR(191) NOT NULL,
    ADD COLUMN `reportItemId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `firstname`,
    DROP COLUMN `lastname`,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `isBanned` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `Wallet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_walletId_fkey` FOREIGN KEY (`walletId`) REFERENCES `Wallet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_rentId_fkey` FOREIGN KEY (`rentId`) REFERENCES `Rent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportImg` ADD CONSTRAINT `ReportImg_reportItemId_fkey` FOREIGN KEY (`reportItemId`) REFERENCES `Report`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
