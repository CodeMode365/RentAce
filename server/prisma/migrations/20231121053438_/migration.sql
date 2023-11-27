/*
  Warnings:

  - You are about to drop the column `userId` on the `pin` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `pin` DROP FOREIGN KEY `Pin_userId_fkey`;

-- AlterTable
ALTER TABLE `pin` DROP COLUMN `userId`;
