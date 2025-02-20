import {
	DocumentBuilder,
	SwaggerModule
} 									from '@nestjs/swagger';
import { NestFactory }              from '@nestjs/core';
import { Logger, ValidationPipe }   from '@nestjs/common';

import { AppModule } from './app.module';


( async () => {
    const logger    = new Logger( 'Main' );
    const app       = await NestFactory.create( AppModule );

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist               : true,
            forbidNonWhitelisted    : true,
        })
    )
    .setGlobalPrefix( 'api/v1' )
    .enableCors({
        origin          : "*",
        credentials     : true,
        methods         : [ "GET", "POST", "PUT", "DELETE" ],
        allowedHeaders  : [ "Content-Type", "Authorization" ],
    });

    const config = new DocumentBuilder()
		.setTitle( 'Pet Social Network Documentation' )
		.setDescription( 'Pet Social Network API Documentation' )
		.setVersion( '1.0' )
		.build();

	const document = SwaggerModule.createDocument( app, config );
	SwaggerModule.setup( 'docs', app, document );

    await app.listen( process.env.PORT ?? 3000 );
	logger.log( `Application is running on: ${ process.env.HOST_API }:${ process.env.PORT_API }`);
})();
