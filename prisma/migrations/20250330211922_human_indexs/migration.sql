/*
  Warnings:

  - You are about to drop the column `facebookId` on the `Human` table. All the data in the column will be lost.
  - You are about to drop the column `googleId` on the `Human` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Human` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "PetFriend_isDeleted_idx";

-- AlterTable
ALTER TABLE "Human" DROP COLUMN "facebookId",
DROP COLUMN "googleId",
DROP COLUMN "lastName",
ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PetFriend" ADD COLUMN     "blockedAt" TIMESTAMP(3),
ADD COLUMN     "isBlocked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "deletedAt",
DROP COLUMN "isDeleted";

-- CreateIndex
CREATE INDEX "Comment_petId_postId_idx" ON "Comment"("petId", "postId");

-- CreateIndex
CREATE INDEX "Human_username_email_idx" ON "Human"("username", "email");

-- CreateIndex
CREATE INDEX "PetFriend_isDeleted_isBlocked_idx" ON "PetFriend"("isDeleted", "isBlocked");
