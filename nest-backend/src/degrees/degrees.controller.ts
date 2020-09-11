import {Body, Controller, Get, Param, Post,UseGuards,Request} from '@nestjs/common';
import {DegreesService} from "./degrees.service";
import {CreateDegreeDto} from "./dto/createDegreeDto";
import {Degree} from "./degree.entity";
import {CreateDegreeCommentDto} from "./dto/create-degree-comment.dto";
import {CreateDegreeImageDto} from "./dto/create-degree-image.dto";
import {AuthGuard} from "../auth/auth.guard";


@UseGuards(AuthGuard)
@Controller('degrees')
export class DegreesController {


  constructor(
    private degreesService : DegreesService
  ){}

  @Get()
  getDegrees() : Promise<Degree[]>{
    return this.degreesService.getAllDegrees();
  }

  @Get("/comments/:degreeId")
  getDegreeComments(@Param() param){
    return this.degreesService.getDegreeCommentsById(param.degreeId);
  }

  @Get("/images/:degreeId")
  getDegreeImagesById(@Param() param){
    return this.degreesService.getDegreeImagesById(param.degreeId);
  }



  @Post()
  createDegree(
    @Body() createDegreeDto : CreateDegreeDto) : Promise<Degree>{
    return this.degreesService.createDegree(createDegreeDto);
  }

  @Post("/comments")
  createDegreeComment(
    @Body() createDegreeCommentsDto: CreateDegreeCommentDto,
    @Request() req ){
      const userId = req.user.id;
      return this.degreesService.createDegreeComment(createDegreeCommentsDto,userId);
  }

  @Post("/images")
  createDegreeImage(@Body() createDegreeImageDto: CreateDegreeImageDto){
    return this.degreesService.createDegreeImage(createDegreeImageDto);
  }


}
