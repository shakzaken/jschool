import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {User} from "../users/user.entity";
import {LoginDto} from "./dto/login-dto";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {


  constructor(
    private usersService: UsersService,
    private jwtService: JwtService){}




  async login(loginDto : LoginDto) {
    const {email} = loginDto;
    const user = await this.usersService.getUserByEmail(email);
    const result = await this.validateUser(loginDto,user);
    if(!result){
      return new UnauthorizedException();
    }
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name
    };
    const token =  this.jwtService.sign(payload);
    return { token: token }

  }

  async validateUser(loginDto:LoginDto,user:User): Promise<boolean>{
    const {password} = loginDto;
    if(user){
      const result : boolean = await bcrypt.compare(password,user.password);
      return result;
    }
    return false;
  }







}
