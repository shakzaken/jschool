import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UsersRepository} from "./users.repository";
import {CreateUserDto} from "./dto/create-user-dto";
import {UserImageRepository} from "./images/user-image.repository";
import {CreateUserImageDto} from "./dto/createUserImage.dto";
import {UserImage} from "./images/user-image.entity";
import {User} from "./user.entity";
import * as bcrypt from "bcrypt";



@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @InjectRepository(UserImageRepository)
    private userImageRepository: UserImageRepository
  ){}


  getAllUsers(){
    return this.usersRepository.getAllUsers();
  }

  getUserImagesById(userId:number) : Promise<UserImage[]>{
    return this.userImageRepository.getUserImagesById(userId);
  }

  async createUser(createUserDto : CreateUserDto){
    createUserDto.password = await this.createHashedPassword(createUserDto.password);
    return this.usersRepository.createUser(createUserDto);
  }

  async createUserImage(createUserImageDto:CreateUserImageDto) : Promise<UserImage>{
    const {userId,image} = createUserImageDto;
    const user = await this.usersRepository.getUserById(userId);
    const result = await this.userImageRepository.createUserImage(user,image);
    return result;
  }


  getUserByEmail(email:string) : Promise<User>{
    return this.usersRepository.getUserByEmail(email);
  }

  async createHashedPassword(password) : Promise<string>{
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    const hash = await bcrypt.hash(password,salt);
    return hash;
  }



}
