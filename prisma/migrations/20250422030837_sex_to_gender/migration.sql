/*
  Warnings:

  - You are about to drop the column `sex` on the `Human` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Human" DROP COLUMN "sex",
ADD COLUMN     "gender" "Gender";
