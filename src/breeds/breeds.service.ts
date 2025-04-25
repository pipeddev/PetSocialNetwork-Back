import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';

import { Breed, Prisma, PrismaClient } from '@prisma/client';

import { CreateBreedDto } from '@breeds/dto/create-breed.dto';
import { UpdateBreedDto } from '@breeds/dto/update-breed.dto';

@Injectable()
export class BreedsService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
  }

  async #valid(breedDto: CreateBreedDto | UpdateBreedDto) {
    if (!breedDto.speciesId && breedDto.name) return;

    const specie = await this.species.findUnique({
      where: { id: breedDto.speciesId },
    });

    if (!specie)
      throw new NotFoundException(
        `Specie with id ${breedDto.speciesId} not found.`,
      );

    const breed = await this.breed.findUnique({
      where: { name: breedDto.name } as Prisma.BreedWhereUniqueInput,
    });

    if (breed)
      throw new BadRequestException(
        `Breed with name ${breedDto.name} already exists.`,
      );
  }

  async create(createBreedDto: CreateBreedDto): Promise<Breed> {
    await this.#valid(createBreedDto);

    return this.breed.create({
      data: createBreedDto,
    });
  }

  async findAll(): Promise<Breed[]> {
    return await this.breed.findMany();
  }

  async findOne(id: string): Promise<Breed> {
    const breed = await this.breed.findUnique({
      where: { id },
    });

    if (!breed) throw new NotFoundException(`Breed with id ${id} not found`);

    return breed;
  }

  async update(id: string, updateBreedDto: UpdateBreedDto): Promise<Breed> {
    await this.findOne(id);
    await this.#valid(updateBreedDto);

    return await this.breed.update({
      where: { id },
      data: updateBreedDto,
    });
  }

  async remove(id: string): Promise<Breed> {
    await this.findOne(id);

    return await this.breed.delete({
      where: { id },
    });
  }
}
