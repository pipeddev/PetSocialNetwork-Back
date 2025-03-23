import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

import { Post, PrismaClient } from '@prisma/client';

import { CreatePostDto } from '@posts/dto/create-post.dto';
import { UpdatePostDto } from '@posts/dto/update-post.dto';

@Injectable()
export class PostsService extends PrismaClient implements OnModuleInit {

	onModuleInit() {
		this.$connect();
	}

  async create(
		petId: string,
		createPostDto: CreatePostDto
	): Promise<Post> {
		const post = await this.post.create({
			data: {
				...createPostDto,
				petId
			}
		});

		return post;
	}

  async findAll(): Promise<Post[]> {
    return this.post.findMany();
  }

  async findOne( id: string ): Promise<Post> {
    const post = await this.post.findUnique({ where: { id } });

		if ( !post ) {
			throw new NotFoundException( 'Post not found' );
		}

		return post;
  }

  async update( id: string, updatePostDto: UpdatePostDto ): Promise<Post> {
		await this.findOne(id);

		const updatedPost = await this.post.update({
			where: { id },
			data: updatePostDto
		});

		return updatedPost;
  }

  async remove( id: string ): Promise<Post> {
		await this.findOne(id);

		const deletedPost = await this.post.delete({ where: { id } });

		return deletedPost;
  }
}
