import { Module } from '@nestjs/common';

import { AuthModule } from '@auth/auth.module';
import { PostsService } from '@posts/posts.service';
import { PostsController } from '@posts/posts.controller';

@Module({
	controllers	: [PostsController],
	providers		: [PostsService],
	imports			: [AuthModule]
})
export class PostsModule {}
