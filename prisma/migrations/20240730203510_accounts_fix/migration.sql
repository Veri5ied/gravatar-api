/*
  Warnings:

  - You are about to drop the column `dribbble` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `github` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `threads` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `tiktok` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `twitch` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `Accounts` table. All the data in the column will be lost.
  - Added the required column `name` to the `Accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accounts" DROP COLUMN "dribbble",
DROP COLUMN "github",
DROP COLUMN "instagram",
DROP COLUMN "threads",
DROP COLUMN "tiktok",
DROP COLUMN "twitch",
DROP COLUMN "twitter",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;
