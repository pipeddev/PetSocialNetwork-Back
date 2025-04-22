import { PartialType } from '@nestjs/swagger';

import { CreateHumanDto } from '@humans/dto/create-human.dto';


export class UpdateHumanDto extends PartialType( CreateHumanDto ) {}