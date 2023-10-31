-- AlterTable
ALTER TABLE `rent` MODIFY `status` ENUM('inprocess', 'renting', 'completed', 'dispute') NOT NULL DEFAULT 'inprocess';
