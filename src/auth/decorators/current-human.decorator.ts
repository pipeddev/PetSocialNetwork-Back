import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';


export const CurrentHuman = createParamDecorator(
    ( data: string, ctx: ExecutionContext ) => {
        const req   = ctx.switchToHttp().getRequest();
        const human = req.human;

        if ( !human ) throw new InternalServerErrorException( 'Human not found (request)' );

        return !data ? human : human[data];
    }
);
