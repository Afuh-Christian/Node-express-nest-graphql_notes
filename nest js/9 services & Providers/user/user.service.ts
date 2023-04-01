import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UserService {
    a(): string {
        return "Heu .....dadfafasdadfa"
    }

    create(req: Request): any {
        return req.body
    }

    update(param: any, req: Request) : any {
    return { body: req.body, param: param }
    }
    
    oneuser(param: any): any {
        return param
    }


}
