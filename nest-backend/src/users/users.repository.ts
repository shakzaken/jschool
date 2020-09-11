import {Repository, EntityRepository} from "typeorm";
import {} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/create-user-dto";
import bcrypt from "bcrypt";
import {BadRequestException} from "@nestjs/common";


@EntityRepository(User)
export class UsersRepository extends Repository<User> {



  async getAllUsers() : Promise<User[]>{
    return this.find({});
  }

  async createUser(createUserDto : CreateUserDto) : Promise<User>{
    const {email,name,password} = createUserDto;
    const user = new User();

    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    await this.save(user);
    return user;
  }

  async getUserById(id:number) : Promise<User>{
    const user = await this.findOne({id:id});
    if(!user){
      throw new BadRequestException("userId is Invalid");
    }
    return user;
  }

  async getUserByEmail(email:string) : Promise<User>{
    const user = await this.findOne({where:{email:email}});
    if(!user){
      throw new BadRequestException("email is Invalid");
    }
    return user;
  }

}
