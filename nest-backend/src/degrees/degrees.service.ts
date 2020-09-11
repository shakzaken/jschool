import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DegreesRepository} from "./degrees.repository";
import {Degree} from "./degree.entity";
import {CreateDegreeCommentDto} from "./dto/create-degree-comment.dto";
import {UsersRepository} from "../users/users.repository";
import {DegreeCommentsRepository} from "./comment/degree-comments.repository";
import {DegreeComment} from "./comment/degree-comment.entity";
import {DegreeImage} from "./image/degree-image.entity";
import {DegreeImageRepository} from "./image/degree-image.repository";
import {CreateDegreeImageDto} from "./dto/create-degree-image.dto";


@Injectable()
export class DegreesService {

  constructor(
    @InjectRepository(DegreesRepository)
    private degreesRepository: DegreesRepository,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @InjectRepository(DegreeCommentsRepository)
    private degreeCommentsRepository : DegreeCommentsRepository,
    @InjectRepository(DegreeImageRepository)
    private degreeImageRepository: DegreeImageRepository
  ){}


  getAllDegrees() : Promise<Degree[]>{
    return this.degreesRepository.getAllDegrees();
  }

  getDegreeCommentsById(degreeId:number) : Promise<DegreeComment[]>{
    return this.degreeCommentsRepository.getDegreeCommentsById(degreeId);
  }

  getDegreeImagesById(degreeId:number) : Promise<DegreeImage[]> {
    return this.degreeImageRepository.getDegreeImagesById(degreeId);
  }

  createDegree(createDegreeDto) : Promise<Degree> {
    return this.degreesRepository.createDegree(createDegreeDto);
  }

  async createDegreeComment(createDegreeCommentDto :CreateDegreeCommentDto,userId:number) : Promise<DegreeComment> {
    const {degreeId,comment} = createDegreeCommentDto;

    const user = await this.usersRepository.getUserById(userId);
    const degree = await this.degreesRepository.getDegreeById(degreeId);
    const result = await this.degreeCommentsRepository.createDegreeComment(user,degree,comment);
    return result;

  }

  async createDegreeImage(createDegreeImageDto : CreateDegreeImageDto) : Promise<DegreeImage>{
    const {degreeId,image} = createDegreeImageDto;
    const degree = await this.degreesRepository.getDegreeById(degreeId);
    const result = await this.degreeImageRepository.createDegreeImage(degree,image);
    return result;
  }

}
