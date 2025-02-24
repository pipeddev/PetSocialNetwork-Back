-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE');

-- CreateTable
CREATE TABLE "Species" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Breed" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "speciesId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Breed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "avatar" TEXT,
    "breedId" TEXT NOT NULL,
    "size" "Size" NOT NULL,
    "color" TEXT,
    "gender" "Gender" NOT NULL,
    "neutered" BOOLEAN NOT NULL DEFAULT false,
    "vaccinated" BOOLEAN NOT NULL DEFAULT false,
    "sterilized" BOOLEAN NOT NULL DEFAULT false,
    "temperament" TEXT,
    "location" TEXT,
    "description" TEXT,
    "isAdopted" BOOLEAN NOT NULL DEFAULT false,
    "isBought" BOOLEAN NOT NULL DEFAULT false,
    "adoptionDate" TIMESTAMP(3),
    "boughtDate" TIMESTAMP(3),
    "isForSale" BOOLEAN NOT NULL DEFAULT false,
    "isForAdoption" BOOLEAN NOT NULL DEFAULT false,
    "forSalePrice" DECIMAL(15,4),
    "currencyId" TEXT,
    "forSaleDate" TIMESTAMP(3),
    "forAdoptionDate" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetFriend" (
    "petId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PetFriend_pkey" PRIMARY KEY ("petId","friendId")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "useFixedDecimals" BOOLEAN NOT NULL DEFAULT true,
    "decimalPlaces" INTEGER NOT NULL DEFAULT 2,
    "locale" TEXT NOT NULL,
    "symbol" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Species_name_key" ON "Species"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pet_username_key" ON "Pet"("username");

-- CreateIndex
CREATE INDEX "PetFriend_isDeleted_idx" ON "PetFriend"("isDeleted");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_code_key" ON "Currency"("code");

-- AddForeignKey
ALTER TABLE "Breed" ADD CONSTRAINT "Breed_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetFriend" ADD CONSTRAINT "PetFriend_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetFriend" ADD CONSTRAINT "PetFriend_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
