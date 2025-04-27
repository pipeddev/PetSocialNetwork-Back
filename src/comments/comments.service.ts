import { ForbiddenException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { PrismaException }				from '@config/prisma-catch';
import { CreateCommentDto } 			from '@comments/dto/create-comment.dto';
import { UpdateCommentDto } 			from '@comments/dto/update-comment.dto';
import { PaginationDto }					from '@common/dtos/pagination';
import { CommentEntity }					from '@comments/comment/comment';
import { HumanAuthDto }						from '@humans/dto/user-auth.dto';
import { PaginationCommentsDto }	from '@pets/dto/pagination/comments.dto';

@Injectable()
export class CommentsService extends PrismaClient implements OnModuleInit  {

	onModuleInit() {
		this.$connect();
	}

	async create(createCommentDto: CreateCommentDto): Promise<CommentEntity> {
		try {
			return await this.comment.create({
				data: createCommentDto
			}) as CommentEntity;
		} catch (error) {
			throw PrismaException.catch( error, 'Comments' );
		}
	}

	async findCommentsByPost(
		postId: string,
		{ page, each, order, eachReply, orderReply }: PaginationCommentsDto
	): Promise<CommentEntity[]> {
		return await this.comment.findMany({
			take    : each,
			skip    : page * each,
			orderBy : { createdAt: order },
			where: {
				postId,
				parentCommentId: null,
			},
			include: {
				replies: {
					take		:(eachReply * -1 ),
					orderBy	: {
						createdAt: orderReply,
					},
				},
			},
		}) as CommentEntity[];
	}

	async findRepliesByComments(
		commentId: string,
		{ page, each, order }: PaginationDto
	): Promise<CommentEntity[]> {
		return await this.comment.findMany({
			take		: each,
			skip		: page * each,
			orderBy	: { createdAt: order },
			where		: { parentCommentId: commentId }
		}) as CommentEntity[];
	}

	async #validComment( commentId: string, human: HumanAuthDto ): Promise<void> {
		const comment = await this.comment.findUnique({
			select	: { petId: true },
			where		: { id: commentId }
		});

		if ( !comment ) throw new NotFoundException( 'Comment not found' );

		const pet = await this.pet.findUnique( {
			select	: { humanId: true },
			where		: { id: comment.petId }
		});

		if ( pet?.humanId !== human.id ) throw new ForbiddenException( 'Yout are not authorized' );
	}

  async update( 
		id: string,
		updateCommentDto: UpdateCommentDto,
		human: HumanAuthDto
	): Promise<CommentEntity> {
		await this.#validComment( id, human );

		try {
			return await this.comment.update({
				where	: { id },
				data	: { content: updateCommentDto.content },
			}) as CommentEntity;
		} catch ( error ) {
			throw PrismaException.catch( error, 'Comments' );
		}
	}

  async remove(
		id: string,
		human: HumanAuthDto
	): Promise<CommentEntity> {
		await this.#validComment( id, human );

		try {
			return await this.comment.delete({
				where	: { id },
			}) as CommentEntity;
		} catch ( error ) {
			throw PrismaException.catch( error, 'Comments' );
		}
	}
}
