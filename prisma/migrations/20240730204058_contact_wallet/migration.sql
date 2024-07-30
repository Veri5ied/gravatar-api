/*
  Warnings:

  - You are about to drop the column `email` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `bitcoin` on the `Wallets` table. All the data in the column will be lost.
  - You are about to drop the column `patreon` on the `Wallets` table. All the data in the column will be lost.
  - You are about to drop the column `paypal` on the `Wallets` table. All the data in the column will be lost.
  - You are about to drop the column `venmo` on the `Wallets` table. All the data in the column will be lost.
  - Added the required column `name` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Wallets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Wallets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "email",
DROP COLUMN "phone",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Wallets" DROP COLUMN "bitcoin",
DROP COLUMN "patreon",
DROP COLUMN "paypal",
DROP COLUMN "venmo",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
