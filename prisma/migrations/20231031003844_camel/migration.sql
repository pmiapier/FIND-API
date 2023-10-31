/*
  Warnings:

  - You are about to drop the column `chatroom_id` on the `chatmessage` table. All the data in the column will be lost.
  - You are about to drop the column `sender_id` on the `chatmessage` table. All the data in the column will be lost.
  - You are about to drop the column `userA_id` on the `chatroom` table. All the data in the column will be lost.
  - You are about to drop the column `userA_seen` on the `chatroom` table. All the data in the column will be lost.
  - You are about to drop the column `userB_id` on the `chatroom` table. All the data in the column will be lost.
  - You are about to drop the column `userB_seen` on the `chatroom` table. All the data in the column will be lost.
  - You are about to drop the column `categories_id` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `itemimage` table. All the data in the column will be lost.
  - You are about to drop the column `item_id` on the `itemimage` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `end_rent_date` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `item_id` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `rentee_id` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `start_rent_date` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `rent_id` on the `report` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `report` table. All the data in the column will be lost.
  - You are about to drop the column `damaged_item_id` on the `reportimg` table. All the data in the column will be lost.
  - You are about to drop the column `rent_id` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `wallet_id` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `birth_date` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `last_login_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `profile_img` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `wallet` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `wallet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chatroomId` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAId` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userASeen` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userBId` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userBSeen` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoriesId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `ItemImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `ItemImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endRentDate` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `renteeId` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startRentDate` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentId` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `damagedItemId` to the `ReportImg` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentId` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletId` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `wallet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `chatmessage` DROP FOREIGN KEY `ChatMessage_chatroom_id_fkey`;

-- DropForeignKey
ALTER TABLE `chatmessage` DROP FOREIGN KEY `ChatMessage_sender_id_fkey`;

-- DropForeignKey
ALTER TABLE `chatroom` DROP FOREIGN KEY `ChatRoom_userA_id_fkey`;

-- DropForeignKey
ALTER TABLE `chatroom` DROP FOREIGN KEY `ChatRoom_userB_id_fkey`;

-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_categories_id_fkey`;

-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_owner_id_fkey`;

-- DropForeignKey
ALTER TABLE `itemimage` DROP FOREIGN KEY `ItemImage_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `location` DROP FOREIGN KEY `Location_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `rent` DROP FOREIGN KEY `Rent_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `rent` DROP FOREIGN KEY `Rent_owner_id_fkey`;

-- DropForeignKey
ALTER TABLE `rent` DROP FOREIGN KEY `Rent_rentee_id_fkey`;

-- DropForeignKey
ALTER TABLE `report` DROP FOREIGN KEY `Report_rent_id_fkey`;

-- DropForeignKey
ALTER TABLE `report` DROP FOREIGN KEY `Report_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `reportimg` DROP FOREIGN KEY `ReportImg_damaged_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_rent_id_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_wallet_id_fkey`;

-- DropForeignKey
ALTER TABLE `wallet` DROP FOREIGN KEY `wallet_user_id_fkey`;

-- DropIndex
DROP INDEX `User_phone_number_key` ON `user`;

-- AlterTable
ALTER TABLE `chatmessage` DROP COLUMN `chatroom_id`,
    DROP COLUMN `sender_id`,
    ADD COLUMN `chatroomId` INTEGER NOT NULL,
    ADD COLUMN `senderId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `chatroom` DROP COLUMN `userA_id`,
    DROP COLUMN `userA_seen`,
    DROP COLUMN `userB_id`,
    DROP COLUMN `userB_seen`,
    ADD COLUMN `userAId` INTEGER NOT NULL,
    ADD COLUMN `userASeen` DATETIME(3) NOT NULL,
    ADD COLUMN `userBId` INTEGER NOT NULL,
    ADD COLUMN `userBSeen` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `item` DROP COLUMN `categories_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `owner_id`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `categoriesId` INTEGER NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `ownerId` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `itemimage` DROP COLUMN `image_url`,
    DROP COLUMN `item_id`,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `itemId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `location` DROP COLUMN `user_id`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `rent` DROP COLUMN `created_at`,
    DROP COLUMN `end_rent_date`,
    DROP COLUMN `item_id`,
    DROP COLUMN `owner_id`,
    DROP COLUMN `rentee_id`,
    DROP COLUMN `start_rent_date`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `endRentDate` DATETIME(3) NOT NULL,
    ADD COLUMN `itemId` INTEGER NOT NULL,
    ADD COLUMN `ownerId` INTEGER NOT NULL,
    ADD COLUMN `renteeId` INTEGER NOT NULL,
    ADD COLUMN `startRentDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `report` DROP COLUMN `rent_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `rentId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `reportimg` DROP COLUMN `damaged_item_id`,
    ADD COLUMN `damagedItemId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `rent_id`,
    DROP COLUMN `wallet_id`,
    ADD COLUMN `rentId` INTEGER NOT NULL,
    ADD COLUMN `walletId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `birth_date`,
    DROP COLUMN `created_at`,
    DROP COLUMN `first_name`,
    DROP COLUMN `last_login_at`,
    DROP COLUMN `last_name`,
    DROP COLUMN `phone_number`,
    DROP COLUMN `profile_img`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `birthDate` DATETIME(3) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `firstname` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastLoginAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `lastname` VARCHAR(191) NOT NULL,
    ADD COLUMN `phoneNumber` INTEGER NOT NULL,
    ADD COLUMN `profileImg` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `wallet` DROP COLUMN `updated_at`,
    DROP COLUMN `user_id`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_phoneNumber_key` ON `User`(`phoneNumber`);

-- AddForeignKey
ALTER TABLE `wallet` ADD CONSTRAINT `wallet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_walletId_fkey` FOREIGN KEY (`walletId`) REFERENCES `wallet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_rentId_fkey` FOREIGN KEY (`rentId`) REFERENCES `Rent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_categoriesId_fkey` FOREIGN KEY (`categoriesId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemImage` ADD CONSTRAINT `ItemImage_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatRoom` ADD CONSTRAINT `ChatRoom_userAId_fkey` FOREIGN KEY (`userAId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatRoom` ADD CONSTRAINT `ChatRoom_userBId_fkey` FOREIGN KEY (`userBId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatMessage` ADD CONSTRAINT `ChatMessage_chatroomId_fkey` FOREIGN KEY (`chatroomId`) REFERENCES `ChatRoom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatMessage` ADD CONSTRAINT `ChatMessage_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_renteeId_fkey` FOREIGN KEY (`renteeId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_rentId_fkey` FOREIGN KEY (`rentId`) REFERENCES `Rent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportImg` ADD CONSTRAINT `ReportImg_damagedItemId_fkey` FOREIGN KEY (`damagedItemId`) REFERENCES `Report`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
