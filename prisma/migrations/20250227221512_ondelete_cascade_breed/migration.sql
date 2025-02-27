-- DropForeignKey
ALTER TABLE "Breed" DROP CONSTRAINT "Breed_speciesId_fkey";

-- AddForeignKey
ALTER TABLE "Breed" ADD CONSTRAINT "Breed_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE CASCADE ON UPDATE CASCADE;
