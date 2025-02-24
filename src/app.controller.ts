import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    constructor() {}

    @Get()
    getHello(): string {
        return 'Bienvenido a Pet Social Network, desarrollado por la comunidad de JSConfCL';
    }
}
