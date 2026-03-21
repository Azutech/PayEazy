/*
  Warnings:

  - You are about to drop the column `verified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `PIN` on the `Wallets` table. All the data in the column will be lost.
  - You are about to drop the column `balance` on the `Wallets` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `Wallets` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Wallets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "verified",
ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "Wallets" DROP COLUMN "PIN",
DROP COLUMN "balance",
DROP COLUMN "currency",
DROP COLUMN "updatedAt",
ADD COLUMN     "pinHash" TEXT;

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KycProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL,
    "nin" TEXT,
    "bvn" TEXT,
    "utilityBillUrl" TEXT,
    "selfieUrl" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KycProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KycProfile_userId_key" ON "KycProfile"("userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
