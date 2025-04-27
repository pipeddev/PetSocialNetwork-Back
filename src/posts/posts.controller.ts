import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseUUIDPipe,
	UseGuards,
	Query
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiUnauthorizedResponse, ApiTags, ApiQuery } from '@nestjs/swagger';

import { AuthGuard } from '@auth/guards/auth.guard';
import { CurrentHuman } from '@auth/decorators/current-human.decorator';
import { PostsService }	from '@posts/posts.service';
import { CreatePostDto } from '@posts/dto/create-post.dto';
import { UpdatePostDto } from '@posts/dto/update-post.dto';
import { HumanAuthDto } from '@humans/dto/user-auth.dto';
import { PaginationDoc } from '@common/dtos/pagination-doc';
import { PaginationCommentsDto } from '@pets/dto/pagination/comments.dto';
import { CommentPaginationDoc } from '@pets/dto/pagination/comment-doc.dto';

@ApiTags('Posts')
@Controller('posts')
@ApiBearerAuth('access-token')
@UseGuards( AuthGuard )
export class PostsController {
	constructor( private readonly postsService: PostsService ) {}

	@Post(':petId')
	create(
		@Param('petId', ParseUUIDPipe ) petId: string,
		@Body() createPostDto: CreatePostDto,
		@CurrentHuman() human: HumanAuthDto,
	) {
		return this.postsService.create( petId, createPostDto, human );
	}

	@Get('by-pet/:petId')
	@ApiQuery(PaginationDoc.PAGE)
	@ApiQuery(PaginationDoc.EACH)
	@ApiQuery(PaginationDoc.ORDER)
	@ApiQuery(CommentPaginationDoc.EACH_COMMENT)
	@ApiQuery(CommentPaginationDoc.ORDER_COMMENT)
	@ApiQuery(CommentPaginationDoc.EACH_REPLY)
	@ApiQuery(CommentPaginationDoc.ORDER_REPLY)
	@ApiOkResponse({ description: 'List of posts' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	findAllByPet(
		@Query() paginationComment: PaginationCommentsDto,
		@Param( 'petId', ParseUUIDPipe ) petId: string,
	) {
		return this.postsService.findAllByPet( petId, paginationComment );
	}

	@Get('index/:petId')
	@ApiQuery(PaginationDoc.PAGE)
	@ApiQuery(PaginationDoc.EACH)
	@ApiQuery(PaginationDoc.ORDER)
	@ApiQuery(CommentPaginationDoc.EACH_COMMENT)
	@ApiQuery(CommentPaginationDoc.ORDER_COMMENT)
	@ApiQuery(CommentPaginationDoc.EACH_REPLY)
	@ApiQuery(CommentPaginationDoc.ORDER_REPLY)
	@ApiOkResponse({ description: 'List of posts' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	findAllIndex(
		@Query() paginationComment: PaginationCommentsDto,
		@CurrentHuman() human: HumanAuthDto,
		@Param( 'petId', ParseUUIDPipe ) petId: string,
	) {
		return this.postsService.findAllIndex( human, petId, paginationComment );
	}

	@Get( ':id' )
	findOne(
		@Query() paginationComment: PaginationCommentsDto,
		@Param( 'id', ParseUUIDPipe ) id: string
	) {
		return this.postsService.findOne( id, paginationComment );
	}
	
	@Patch(':id')
	update(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() updatePostDto: UpdatePostDto
	) {
		return this.postsService.update( id, updatePostDto );
	}
	
	@Delete(':id')
	remove(@Param('id', ParseUUIDPipe) id: string) {
		return this.postsService.remove( id );
	}
}
