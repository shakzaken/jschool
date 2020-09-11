import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class AuthGuard implements CanActivate {


  constructor(
    private jwtService:JwtService){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{

    try{
      const req : any = context.switchToHttp().getRequest();
      const token = req.headers["authorization"];
      const user = await this.jwtService.verify(token);
      req.user = user;
      return true;
    }
    catch(e){
      return false;
    }

  }
}
