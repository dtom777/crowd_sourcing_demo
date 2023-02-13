/*
  Warnings:

  - Made the column `categorySlug` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_categorySlug_fkey`;

-- AlterTable
ALTER TABLE `Post` MODIFY `categorySlug` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_categorySlug_fkey` FOREIGN KEY (`categorySlug`) REFERENCES `Category`(`slug`) ON DELETE CASCADE ON UPDATE CASCADE;
