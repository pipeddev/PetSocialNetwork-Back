import { Module } from '@nestjs/common';

import { AppController }    from './app.controller';
import { PetsModule }       from '@pets/pets.module';
import { CommonModule }     from '@common/common.module';
import { SpeciesModule }    from '@species/species.module';
import { BreedsModule }    	from '@breeds/breeds.module';
import { CurrenciesModule } from '@currencies/currencies.module';
import { CareTipsModule } from './care-tips/care-tips.module';
import { HumansModule }     from '@humans/humans.module';
import { PostsModule }      from '@posts/posts.module';
import { CommentsModule }   from '@comments/comments.module';
import { AuthModule }       from '@auth/auth.module';

@Module({
	imports       : [
		PetsModule,
		CommonModule,
		SpeciesModule,
		BreedsModule,
		CurrenciesModule,
		HumansModule,
		PostsModule,
		CommentsModule,
		AuthModule,
		CareTipsModule
	],
  controllers   : [AppController],
  providers     : [],
})
export class AppModule {}
