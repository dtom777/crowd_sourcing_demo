/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_categoryId_fkey`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `categoryId`,
    ADD COLUMN `categorySlug` VARCHAR(191);

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_categorySlug_fkey` FOREIGN KEY (`categorySlug`) REFERENCES `Category`(`slug`) ON DELETE CASCADE ON UPDATE CASCADE;
