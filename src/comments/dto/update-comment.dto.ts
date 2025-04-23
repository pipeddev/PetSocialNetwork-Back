import { ApiProperty } from "@nestjs/swagger";

import { IsString } from "class-validator";

export class UpdateCommentDto {

	@ApiProperty({
		description	: 'The content of the comment',
		example			: 'This is the content of my first comment',
	})
	@IsString()
	content: string;

}
