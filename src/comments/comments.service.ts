import { ForbiddenException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { PrismaException }	from '@config/prisma-catch';
import { CreateCommentDto } from '@comments/dto/create-comment.dto';
import { UpdateCommentDto } from '@comments/dto/update-comment.dto';
import { HumanAuthDto }			from '@humans/dto/user-auth.dto';

@Injectable()
export class CommentsService extends PrismaClient implements OnModuleInit  {

	onModuleInit() {
		this.$connect();
	}

  async create(createCommentDto: CreateCommentDto) {
		try {
			return await this.comment.create({
				data: createCommentDto
			})
		} catch (error) {
			throw PrismaException.catch( error, 'Comments' );
		}
  }

	// TODO: Agregar paginación
  async findCommentsByPost( postId: string ) {
		return await this.comment.findMany({
			where: {
				postId,
				parentCommentId: null,
			},
			include: {
				replies: {
					take		: -5,
					orderBy	: {
						createdAt: 'asc',
					},
				},
			},
		});
	}

	// TODO: Agregar paginación
	async findRepliesByComments( commentId: string ) {
		return await this.comment.findMany({
			where: { parentCommentId: commentId }
		});
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
	) {
		await this.#validComment( id, human );

		try {
			return await this.comment.update({
				where	: { id },
				data	: { content: updateCommentDto.content },
			});
		} catch ( error ) {
			throw PrismaException.catch( error, 'Comments' );
		}
	}

  async remove(
		id: string,
		human: HumanAuthDto
	) {
		await this.#validComment( id, human );

		try {
			return await this.comment.delete({
				where	: { id },
			});
		} catch ( error ) {
			throw PrismaException.catch( error, 'Comments' );
		}
	}
}
