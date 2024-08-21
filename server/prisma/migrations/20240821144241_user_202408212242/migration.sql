/*
  Warnings:

  - You are about to drop the column `account` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_account_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `account`,
    ADD COLUMN `create_by` VARCHAR(64) NULL,
    ADD COLUMN `create_time` DATETIME(3) NULL,
    ADD COLUMN `dept_id` INTEGER NULL,
    ADD COLUMN `is_deleted` TINYINT NULL DEFAULT 0,
    ADD COLUMN `mobile` VARCHAR(20) NULL,
    ADD COLUMN `nickname` VARCHAR(64) NULL,
    ADD COLUMN `status` TINYINT NULL DEFAULT 1,
    ADD COLUMN `update_by` VARCHAR(64) NULL,
    ADD COLUMN `update_time` DATETIME(3) NULL,
    ADD COLUMN `username` VARCHAR(64) NOT NULL,
    MODIFY `password` VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);
