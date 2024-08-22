-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(32) NOT NULL,
    `name` VARCHAR(64) NULL,
    `sort` TINYINT NULL,
    `status` TINYINT NOT NULL DEFAULT 1,
    `is_deleted` TINYINT NOT NULL DEFAULT 0,
    `create_by` VARCHAR(64) NULL,
    `update_by` VARCHAR(64) NULL,
    `create_time` DATETIME(3) NULL,
    `update_time` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parent_id` INTEGER NULL,
    `name` VARCHAR(64) NOT NULL,
    `type` VARCHAR(32) NOT NULL,
    `route_name` VARCHAR(255) NULL,
    `route_path` VARCHAR(255) NULL,
    `btn_code` VARCHAR(128) NULL,
    `always_show` TINYINT NULL,
    `keep_alive` TINYINT NULL DEFAULT 1,
    `hidden` TINYINT NULL DEFAULT 0,
    `sort` INTEGER NULL DEFAULT 0,
    `icon` VARCHAR(64) NOT NULL,
    `redirect` VARCHAR(255) NOT NULL,
    `create_by` VARCHAR(64) NULL,
    `update_by` VARCHAR(64) NULL,
    `create_time` DATETIME(3) NULL,
    `update_time` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
