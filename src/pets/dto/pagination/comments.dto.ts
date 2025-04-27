import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsPositive, Max, Min } from "class-validator";

import { PaginationDto } from "@common/dtos/pagination";

export class PaginationCommentsDto extends PaginationDto {

	@IsOptional()
	@IsPositive()
	@Min( 1 )
	@Max( 1000 )
	@Type(() => Number)
	eachReply: number = 10;

	@IsOptional()
	@IsPositive()
	@Min( 1 )
	@Max( 5000 )
	@Type(() => Number)
	eachComment: number = 10;

	@IsOptional()
	@IsEnum( [ 'asc', 'desc' ] )
	orderComment: 'asc' | 'desc' = 'desc';

	@IsOptional()
	@IsEnum( [ 'asc', 'desc' ] )
	orderReply: 'asc' | 'desc' = 'asc';

}