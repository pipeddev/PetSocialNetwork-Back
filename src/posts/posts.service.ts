import { ForbiddenException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

import { Post, Prisma, PrismaClient } from '@prisma/client';

import { CreatePostDto } from '@posts/dto/create-post.dto';
import { UpdatePostDto } from '@posts/dto/update-post.dto';
import { HumanAuthDto } from '@humans/dto/user-auth.dto';

@Injectable()
export class PostsService extends PrismaClient implements OnModuleInit {

	onModuleInit() {
		this.$connect();
	}

	async #validPet( human: HumanAuthDto, petId: string ) {
		const pet = await this.pet.findUnique({ 
			where: { id: petId }
		});

		if ( !pet ) throw new NotFoundException( 'Pet not found' );

		if ( pet.humanId !== human.id ) {
			throw new ForbiddenException('You are not authorized to access this resource');
		}
	}

	#includeCommentsAndReplies = (
		commentsTake: number,
		repliesTake: number
	): Prisma.PostInclude => ({
		comments: {
			take	: commentsTake,
			where	: {
				parentCommentId: null,
			},
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				replies: {
					take		: repliesTake,
					orderBy	: {
						createdAt: 'asc',
					},
				},
			},
		},
	});

	async create(
		petId: string,
		createPostDto: CreatePostDto,
		human: HumanAuthDto,
	): Promise<Post> {
		await this.#validPet( human, petId );

		const post = await this.post.create({
			data: {
				...createPostDto,
				petId
			}
		});

		return post;
	}

	// TODO: Agregar un paginador
	async findAllByPet(
		petId: string,
	): Promise<Post[]> {
		return this.post.findMany({
			where: { petId: petId },
			include	: this.#includeCommentsAndReplies( -10, -5 )
		});
	}

	// TODO: Agregar un paginador
	async findAllIndex(
		human: HumanAuthDto,
		petId: string,
	): Promise<Post[]> {
		await this.#validPet( human, petId );

		const petFriends = await this.petFriend.findMany({
			where		: { petId },
			select	: {  friendId: true }
		});

		const friendIds					= petFriends.map(( petFriend ) => petFriend.friendId );
		const allPetIdsToQuery	= [...friendIds, petId];

		return this.post.findMany({
			where: {
				petId: {
					in: allPetIdsToQuery
				},
				createdAt: {
					lte: new Date()
				}
			},
			include	: this.#includeCommentsAndReplies( -10, -5 )
		});
  }

	// TODO: Agregar un paginador
  async findOne( id: string ): Promise<Post> {
    const post = await this.post.findUnique({
			where		: { id },
			include	: this.#includeCommentsAndReplies( -10, -5 )
		});

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
