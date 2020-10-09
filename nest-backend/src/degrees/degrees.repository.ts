import {Repository, EntityRepository, DeleteResult} from "typeorm";
import {Degree} from "./degree.entity";
import {CreateDegreeDto} from "./dto/createDegreeDto";
import {BadRequestException} from "@nestjs/common";
import {UpdateDegreeDto} from "./dto/update-degree-dto";


@EntityRepository(Degree)
export class DegreesRepository extends Repository<Degree> {


  getAllDegrees() : Promise<Degree[]>{
    return this.find({});
  }

  async createDegree(createDegreeDto : CreateDegreeDto) : Promise<Degree>{
    const degree = new Degree();
    degree.name = createDegreeDto.name;
    degree.description = createDegreeDto.description;
    await this.save(degree);
    return degree;
  }

  async getDegreeById(id:number) : Promise<Degree>{
      const degree = await this.findOne({id:id});
      if(!degree){
        throw new BadRequestException("degreeId is invalid");
      }
      return degree;
  }

  async deleteDegreeById(id:number) : Promise<DeleteResult>{
    const degree = await this.findOne(id);
    if(!degree){
      throw new BadRequestException("Degree id is invalid");
    }
    const res = await this.delete(degree);
    return res;
  }

  async updateDegree(updateDegreeDto: UpdateDegreeDto) : Promise<Degree>{
    const degree = await this.getDegreeById(updateDegreeDto.id);
    degree.name = updateDegreeDto.name;
    degree.description = updateDegreeDto.description;
    return this.save(degree);
  }

}
