import {Inject, Injectable} from '@nestjs/common';
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
import {UpdateDegreeDto} from "./dto/update-degree-dto";
import {AddCourseDegreeDto} from "./dto/add-course-degree.dto";
import {CoursesService} from "../courses/courses.service";
import {Course} from "../courses/courses.entity";


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
    private degreeImageRepository: DegreeImageRepository,
    private coursesService:CoursesService
  ){}


  getAllDegrees() : Promise<Degree[]>{
    return this.degreesRepository.getAllDegrees();
  }


  async getDegreeWithCoursesAndComments(degreeId:number) : Promise<Degree>{
    const degree : Degree = await this.degreesRepository.getDegreeWithCoursesAndComments(degreeId);
    const count = degree.degreeImages.length - 1;
    degree.degreeImages.splice(1,count);
    return degree;
  }
  async getAllDegreesWithImage() : Promise<Degree[]>{

    /* Take only the first image */
    const degreesWithImage = await this.degreesRepository.getAllDegreesWithImages();
    degreesWithImage.forEach(degree => {
      const count = degree.degreeImages.length - 1;
      degree.degreeImages.splice(1,count);
    });
    return degreesWithImage;
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

  async createDegreeImages(createDegreeImageDto : CreateDegreeImageDto) : Promise<DegreeImage[]>{
    const {degreeId,images} = createDegreeImageDto;
    const degree = await this.degreesRepository.getDegreeById(degreeId);

    const degreeImages = await this.degreeImageRepository.getDegreeImagesById(degreeId);
    if(degreeImages.length > 0){
      await this.degreeImageRepository.deleteDegreeImage(degreeImages);
    }

    const result = await this.degreeImageRepository.createDegreeImages(degree,images);
    return result;
  }

  async deleteDegreeById(id:number){
    return this.degreesRepository.deleteDegreeById(id);
  }

  async updateDegree(updateDegreeDto: UpdateDegreeDto){
    return this.degreesRepository.updateDegree(updateDegreeDto);
  }

  async addCourseToDegree(courseDegreeDto: AddCourseDegreeDto){
    const {courseId,degreeId} = courseDegreeDto;
    const course : Course = await this.coursesService.getCourseById(courseId);
    const degree :Degree = await this.degreesRepository.addCourseToDegree(degreeId,course);
    return degree;
  }

}
