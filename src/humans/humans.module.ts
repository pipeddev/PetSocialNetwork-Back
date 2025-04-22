import { Module } from '@nestjs/common';

import { AuthModule } from '@auth/auth.module';
import { HumansService } from '@humans/humans.service';
import { HumansController }	from '@humans/humans.controller';

@Module({
	controllers	: [HumansController],
	providers		: [HumansService],
	imports			: [AuthModule]
})
export class HumansModule {}
