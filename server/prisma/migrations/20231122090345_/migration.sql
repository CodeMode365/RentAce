/*
  Warnings:

  - You are about to alter the column `lat` on the `pin` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `long` on the `pin` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `pin` MODIFY `lat` DOUBLE NOT NULL,
    MODIFY `long` DOUBLE NOT NULL;
