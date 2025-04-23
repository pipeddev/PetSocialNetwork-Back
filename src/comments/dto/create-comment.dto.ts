import { ApiProperty } from "@nestjs/swagger";

import { IsOptional, IsString, IsUUID } from "class-validator";

import { UpdateCommentDto } from "./update-comment.dto";

export class CreateCommentDto extends UpdateCommentDto {

	@ApiProperty({
		description: 'The ID of the post this comment belongs to',
		example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  })
  @IsString()
  @IsUUID()
  postId: string;

  @ApiProperty({
    description: 'The ID of the pet that made this comment',
    example: 'f9e8d7c6-b5a4-3210-fedc-ba9876543210',
  })
  @IsString()
  @IsUUID()
  petId: string;

  @ApiProperty({
    description: 'The ID of the parent comment (optional, for replies)',
    example: '01234567-89ab-cdef-0123-456789abcdef',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  parentCommentId?: string | null;

}
