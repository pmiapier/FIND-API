-- AlterTable
ALTER TABLE `item` MODIFY `status` ENUM('stock', 'available', 'reserve', 'renting') NOT NULL DEFAULT 'stock';
