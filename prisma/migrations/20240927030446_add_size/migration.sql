/*
  Warnings:

  - Added the required column `size` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `size` ENUM('S', 'M', 'L', 'XL', 'XXL') NOT NULL;
