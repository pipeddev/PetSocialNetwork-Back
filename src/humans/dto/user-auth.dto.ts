import { CreateHumanDto } from '@humans/dto/create-human.dto';

import { HumanDto } from './human.entity';


export class HumanAuthDto extends HumanDto implements Omit<CreateHumanDto, 'password'> {}