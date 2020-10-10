import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
  Put,
  UseInterceptors,
  UploadedFiles
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user-dto";
import {User} from "./user.entity";
import {CreateUserImageDto} from "./dto/createUserImage.dto";
import {AuthGuard} from "../auth/auth.guard";
import {UpdateUserDto} from "./dto/update-user-dto";
import {FilesInterceptor} from "@nestjs/platform-express";
import {CreateCourseImageDto} from "../courses/dto/create-course-image.dto";


@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {

  constructor(
    private usersService: UsersService
  ){}



  @Get()
  getUsers() : Promise<User[]>{
    return this.usersService.getAllUsers();
  }

  @Get("/images/:userId")
  getUserImagesById(@Param() param){
    return this.usersService.getUserImagesById(param.userId);
  }


  @Post()
  createUser(@Body() createUserDto: CreateUserDto) : Promise<User>{
    return this.usersService.createUser(createUserDto);
  }

  @Put()
  updateUser(@Body() updateUserDto: UpdateUserDto): Promise<User>{
    return this.usersService.updateUser(updateUserDto);
  }




  @Post("/images/:userId")
  @UseInterceptors(FilesInterceptor('files'))
  async createUserImage(@UploadedFiles() files,@Param() param){

    const userId : number = parseInt(param.userId);
    const buffer : Buffer = files[0].buffer;
    const bufferString : string = buffer.toString("base64");
    const createUserImageDto : CreateUserImageDto = {
      image:bufferString,userId
    };
    const res = await this.usersService.createUserImage(createUserImageDto);

    return res;
  }



  @Delete("/:id")
  deleteUser(@Param() param){
    return this.usersService.deleteUserById(param.id);
  }



}
