import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { AuthGuard }							from '@auth/guards/auth.guard';
import { CurrentHuman }						from '@auth/decorators/current-human.decorator';
import { CommentsService }				from '@comments/comments.service';
import { CreateCommentDto } 			from '@comments/dto/create-comment.dto';
import { UpdateCommentDto } 			from '@comments/dto/update-comment.dto';
import { PaginationDto }					from '@common/dtos/pagination';
import { PaginationDoc }					from '@common/dtos/pagination-doc';
import { CommentPaginationDoc } 	from '@pets/dto/pagination/comment-doc.dto';
import { PaginationCommentsDto }	from '@pets/dto/pagination/comments.dto';
import { HumanAuthDto }						from '@humans/dto/user-auth.dto';

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
	@ApiQuery(PaginationDoc.PAGE)
	@ApiQuery(PaginationDoc.EACH)
	@ApiQuery(PaginationDoc.ORDER)
	@ApiQuery(CommentPaginationDoc.EACH_REPLY)
	@ApiQuery(CommentPaginationDoc.ORDER_REPLY)
  findCommentsByPost(
		@Query() paginationComment: PaginationCommentsDto,
		@Param( 'postId', ParseUUIDPipe ) id: string,
	) {
    return this.commentsService.findCommentsByPost( id, paginationComment );
  }

	@Get('/replies/:commentId')
	@ApiQuery(PaginationDoc.PAGE)
	@ApiQuery(PaginationDoc.EACH)
	@ApiQuery(PaginationDoc.ORDER)
  findRepliesByComments(
		@Query() pagination: PaginationDto,
		@Param( 'commentId', ParseUUIDPipe ) id: string,
	) {
    return this.commentsService.findRepliesByComments( id, pagination );
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
