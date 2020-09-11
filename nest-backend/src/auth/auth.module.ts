import { Module,Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UsersService} from "../users/users.service";
import {JwtService,JwtModule} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";
import {jwtConstants} from "../config/auth";
import {PassportModule} from "@nestjs/passport";
import { AuthController } from './auth.controller';
import {AuthGuard} from "./auth.guard";


@Global()
@Module({
  imports:[UsersModule,PassportModule.register({defaultStrategy:"jwt"}),JwtModule.register({
    secret:jwtConstants.secret,
    signOptions: {expiresIn: "24h"}
  })],
  providers: [AuthService,AuthGuard],
  exports: [AuthService,AuthGuard,JwtModule],
  controllers: [AuthController]

})
export class AuthModule {}
