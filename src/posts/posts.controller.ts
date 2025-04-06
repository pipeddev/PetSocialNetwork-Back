import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseUUIDPipe,
	UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiUnauthorizedResponse, ApiTags } from '@nestjs/swagger';


import { AuthGuard } from '@auth/guards/auth.guard';
import { CurrentHuman } from '@auth/decorators/current-human.decorator';
import { PostsService }	from '@posts/posts.service';
import { CreatePostDto } from '@posts/dto/create-post.dto';
import { UpdatePostDto } from '@posts/dto/update-post.dto';
import { HumanAuthDto } from '@humans/dto/user-auth.dto';

@ApiTags('Posts') 
@Controller('posts')
@ApiBearerAuth('access-token')
@UseGuards( AuthGuard )
export class PostsController {
  constructor( private readonly postsService: PostsService ) {}

  @Post()
  create(
		@Param('petId', ParseUUIDPipe ) petId: string,
		@Body() createPostDto: CreatePostDto
	) {
    return this.postsService.create( petId, createPostDto );
	}

  @Get('by-pet/:petId')
 	@ApiOkResponse({ description: 'List of posts' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findAllByPet(
		@CurrentHuman() human: HumanAuthDto,
		@Param( 'petId', ParseUUIDPipe ) petId: string,
	) {
    return this.postsService.findAllByPet( human, petId );
  }

	@Get('index/:petId')
	@ApiOkResponse({ description: 'List of posts' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findAllIndex(
		@CurrentHuman() human: HumanAuthDto,
		@Param( 'petId', ParseUUIDPipe ) petId: string,
	) {
    return this.postsService.findAllIndex( human, petId );
  }

  @Get( ':id' )
  findOne(
		@Param( 'id', ParseUUIDPipe ) id: string
	) {
    return this.postsService.findOne( id );
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
