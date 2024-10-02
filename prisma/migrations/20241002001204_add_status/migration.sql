/*
  Warnings:

  - You are about to drop the column `role` on the `admin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `admin` DROP COLUMN `role`;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `addres` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `information` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `paymentMethode` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `phone_number` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `status` ENUM('approved', 'process') NOT NULL DEFAULT 'process';
