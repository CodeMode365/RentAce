-- AlterTable
ALTER TABLE `pin` ADD COLUMN `userId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `PinImage` (
    `id` VARCHAR(191) NOT NULL,
    `thumbnailUrl` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `pinId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pin` ADD CONSTRAINT `Pin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PinImage` ADD CONSTRAINT `PinImage_pinId_fkey` FOREIGN KEY (`pinId`) REFERENCES `Pin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
