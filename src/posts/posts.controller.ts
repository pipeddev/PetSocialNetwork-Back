import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseUUIDPipe
} from '@nestjs/common';

import { PostsService }		from '@posts/posts.service';
import { CreatePostDto }	from '@posts/dto/create-post.dto';
import { UpdatePostDto }	from '@posts/dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(
		@Param('petId', ParseUUIDPipe ) petId: string,
		@Body() createPostDto: CreatePostDto
	) {
    return this.postsService.create( petId, createPostDto );
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
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
