import { ForbiddenException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

import { Post, Prisma, PrismaClient } from '@prisma/client';

import { CreatePostDto } from '@posts/dto/create-post.dto';
import { UpdatePostDto } from '@posts/dto/update-post.dto';
import { HumanAuthDto } from '@humans/dto/user-auth.dto';
import { PaginationDto } from '@common/dtos/pagination';
import { PaginationCommentsDto } from '@pets/dto/pagination/comments.dto';

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
		commentsTake	: number,
		repliesTake		: number,
		orderComment	: 'asc' | 'desc',
		orderReply		: 'asc' | 'desc'
	): Prisma.PostInclude => ({
		comments: {
			take	: commentsTake,
			where	: {
				parentCommentId: null,
			},
			orderBy: {
				createdAt: orderComment,
			},
			include: {
				replies: {
					take		: repliesTake,
					orderBy	: {
						createdAt: orderReply,
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

	async findAllByPet(
		petId: string,
		{ page, each, order, eachComment, eachReply, orderComment, orderReply }: PaginationCommentsDto
	): Promise<Post[]> {
		return this.post.findMany({
			take    : each,
			skip    : page * each,
			orderBy : { createdAt: order },
			where   : { petId: petId },
			include	: this.#includeCommentsAndReplies(( eachComment * -1 ), ( eachReply * -1 ), orderComment, orderReply)
		});
	}

	async findAllIndex(
	human: HumanAuthDto,
	petId: string,
	{ page, each, order, eachComment, eachReply, orderComment, orderReply }: PaginationCommentsDto
): Promise<Post[]> {
		await this.#validPet( human, petId );

		const petFriends = await this.petFriend.findMany({
			where		: { petId },
			select	: {  friendId: true }
		});

		const friendIds					= petFriends.map(( petFriend ) => petFriend.friendId );
		const allPetIdsToQuery	= [...friendIds, petId];

		return this.post.findMany({
			take    : each,
			skip    : page * each,
			orderBy : { createdAt: order },
			where: {
				petId: {
					in: allPetIdsToQuery
				},
				createdAt: {
					lte: new Date()
				}
			},
			include	: this.#includeCommentsAndReplies(( eachComment * -1 ), ( eachReply * -1 ), orderComment, orderReply )
		});
  }

  async findOne(
		id: string,
	{ eachComment, eachReply, orderComment, orderReply }: PaginationCommentsDto

	): Promise<Post> {
    const post = await this.post.findUnique({
			where		: { id },
			include	: this.#includeCommentsAndReplies(( eachComment * -1 ), ( eachReply * -1 ), orderComment, orderReply )
		});

		if ( !post ) {
			throw new NotFoundException( 'Post not found' );
		}

		return post;
  }

  async update( id: string, updatePostDto:UpdatePostDto ): Promise<Post> {
		await this.findOne(id, { page: 1, each: 10, order: 'desc', eachComment: 10, eachReply: 5, orderComment: 'desc', orderReply: 'asc' });

		const updatedPost = await this.post.update({
			where: { id },
			data: updatePostDto
		});

		return updatedPost;
  }

  async remove( id: string ): Promise<Post> {
		await this.findOne(id, { page: 1, each: 10, order: 'desc', eachComment: 10, eachReply: 5, orderComment: 'desc', orderReply: 'asc' });

		const deletedPost = await this.post.delete({ where: { id } });

		return deletedPost;
  }
}
