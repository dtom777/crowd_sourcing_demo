/*
  Warnings:

  - You are about to drop the column `categorySlug` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_categorySlug_fkey`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `categorySlug`,
    ADD COLUMN `categoryId` VARCHAR(191);

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
