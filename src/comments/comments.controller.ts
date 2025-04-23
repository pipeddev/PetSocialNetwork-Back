import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthGuard }				from '@auth/guards/auth.guard';
import { CurrentHuman }			from '@auth/decorators/current-human.decorator';
import { CommentsService }	from '@comments/comments.service';
import { CreateCommentDto } from '@comments/dto/create-comment.dto';
import { UpdateCommentDto } from '@comments/dto/update-comment.dto';
import { HumanAuthDto }			from '@humans/dto/user-auth.dto';

@ApiTags('Comments')
@Controller('comments')
@ApiBearerAuth('access-token')
@UseGuards( AuthGuard )
export class CommentsController {
  constructor( private readonly commentsService: CommentsService ) {}

  @Post()
  create(
		@Body() createCommentDto: CreateCommentDto
	) {
    return this.commentsService.create( createCommentDto );
  }

  @Get(':postId')
  findCommentsByPost(
		@Param( 'postId', ParseUUIDPipe ) id: string,
	) {
    return this.commentsService.findCommentsByPost( id );
  }

	@Get('/replies/:commentId')
  findRepliesByComments(
		@Param( 'commentId', ParseUUIDPipe ) id: string,
	) {
    return this.commentsService.findRepliesByComments( id );
  }

  @Patch(':id')
  update(
		@Param( 'id', ParseUUIDPipe ) id: string,
		@Body() updateCommentDto: UpdateCommentDto,
		@CurrentHuman() human: HumanAuthDto,
	) {
		return this.commentsService.update( id, updateCommentDto, human );
	}

  @Delete(':id')
  remove(
		@Param( 'id', ParseUUIDPipe ) id: string,
		@CurrentHuman() human: HumanAuthDto,
	) {
    return this.commentsService.remove( id, human );
  }
}
