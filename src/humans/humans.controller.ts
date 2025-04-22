import {
	Controller,
	Get,
	Body,
	Patch,
	Delete,
	UseGuards
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse
} from '@nestjs/swagger';

import { AuthGuard } from '@auth/guards/auth.guard';
import { HumansService } from '@humans/humans.service';
import { UpdateHumanDto } from '@humans/dto/update-human.dto';
import { CurrentHuman } from '@auth/decorators/current-human.decorator';
import { HumanAuthDto } from './dto/user-auth.dto';

@ApiTags('Humans')
@Controller('humans')
@ApiBearerAuth('access-token')
@UseGuards( AuthGuard )
export class HumansController {
	constructor(private readonly humansService: HumansService) {}

	@Get()
	@ApiOkResponse({ description: 'Human' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	findMyself(
		@CurrentHuman() human: HumanAuthDto,
	) {
		return human;
	}

	@Patch()
	@ApiOkResponse({ description: 'Updated Human' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	update(
		@Body() updateHumanDto: UpdateHumanDto,
		@CurrentHuman() human: HumanAuthDto,
	) {
		return this.humansService.update( updateHumanDto, human );
	}

	@Delete()
	removeMyself(
		@CurrentHuman() human: HumanAuthDto
	) {
		return this.humansService.remove( human );
	}

}
