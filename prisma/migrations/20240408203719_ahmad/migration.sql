-- CreateTable
CREATE TABLE `Therapy` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `egitim` VARCHAR(191) NULL,
    `lisans` VARCHAR(191) NULL,
    `yuksekLisans` VARCHAR(191) NULL,
    `terapiEgtim` VARCHAR(191) NULL,
    `uzmanAlan` VARCHAR(191) NULL,
    `summery` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL DEFAULT 'https://res.cloudinary.com/ddxser4ml/image/upload/txwk370nwk6kg6hxluxn.jpg',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TherapyType` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TherapyTypeTherapy` (
    `id` VARCHAR(191) NOT NULL,
    `therapyId` VARCHAR(191) NOT NULL,
    `therapyTypeId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TherapyPlace` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TherapyPlaceTherapy` (
    `id` VARCHAR(191) NOT NULL,
    `therapyId` VARCHAR(191) NOT NULL,
    `therapyPlaceId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TherapyUnvan` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TherapyUnvanTherapy` (
    `id` VARCHAR(191) NOT NULL,
    `therapyId` VARCHAR(191) NOT NULL,
    `therapyUnvanId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TherapyTypeTherapy` ADD CONSTRAINT `TherapyTypeTherapy_therapyId_fkey` FOREIGN KEY (`therapyId`) REFERENCES `Therapy`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TherapyTypeTherapy` ADD CONSTRAINT `TherapyTypeTherapy_therapyTypeId_fkey` FOREIGN KEY (`therapyTypeId`) REFERENCES `TherapyType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TherapyPlaceTherapy` ADD CONSTRAINT `TherapyPlaceTherapy_therapyId_fkey` FOREIGN KEY (`therapyId`) REFERENCES `Therapy`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TherapyPlaceTherapy` ADD CONSTRAINT `TherapyPlaceTherapy_therapyPlaceId_fkey` FOREIGN KEY (`therapyPlaceId`) REFERENCES `TherapyPlace`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TherapyUnvanTherapy` ADD CONSTRAINT `TherapyUnvanTherapy_therapyId_fkey` FOREIGN KEY (`therapyId`) REFERENCES `Therapy`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TherapyUnvanTherapy` ADD CONSTRAINT `TherapyUnvanTherapy_therapyUnvanId_fkey` FOREIGN KEY (`therapyUnvanId`) REFERENCES `TherapyUnvan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
