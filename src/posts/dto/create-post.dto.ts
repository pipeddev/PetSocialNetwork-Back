import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsOptional } from 'class-validator';

export class CreatePostDto {

	@ApiProperty({
		description	: 'The title of the post',
		example			: 'My First Post',
	})
	@IsString()
	title: string;

	@ApiProperty({
		description	: 'The content of the post',
		example			: 'This is the content of my first post.',
		required		: false,
	})
	@IsOptional()
	@IsString()
	content?: string;

	@ApiProperty({
		description	: 'The URL of the media associated with the post',
		example			: 'https://example.com/media.jpg',
		required		: false,
	})
	@IsOptional()
	@IsString()
	media_url?: string;

}
