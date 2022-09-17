import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

@Get()
getHola(){
    return "Hello world"
}

}