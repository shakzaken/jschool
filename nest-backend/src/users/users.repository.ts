import {Repository, EntityRepository, DeleteResult} from "typeorm";
import {} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/create-user-dto";
import bcrypt from "bcrypt";
import {BadRequestException} from "@nestjs/common";
import {UpdateUserDto} from "./dto/update-user-dto";


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
  async deleteUserById(id:number) : Promise<DeleteResult>{
    const user = await this.findOne(id);
    if(!user){
      throw new BadRequestException("User id is Invalid");
    }
    const res : DeleteResult= await this.delete(id);
    return res;
  }

  async updateUser(updateUserDto:UpdateUserDto) : Promise<User>{
    const { id,name,email } = updateUserDto;
    const user = await this.getUserById(id);
    user.name = name;
    user.email = email;
    return this.save(user);
  }

}
