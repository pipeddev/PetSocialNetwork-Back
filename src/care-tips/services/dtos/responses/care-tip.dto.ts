import { ApiProperty } from '@nestjs/swagger';
import { Type, CareTip } from '@prisma/client';

export class CareTipDto {
  id: string;
  name: string;
  description: string;
  type: Type;
  tips: string[];
  mediaUrl?: string;

  static valueOf(careTip: CareTip): CareTipDto {
    const dto = new CareTipDto();
    dto.id = careTip.id;
    dto.name = careTip.name;
    dto.description = careTip.description;
    dto.type = careTip.type;
    dto.tips = careTip.tips;
    dto.mediaUrl = careTip?.media_url ?? '';
    return dto;
  }
}
