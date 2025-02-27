/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Breed` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Breed_name_key" ON "Breed"("name");
