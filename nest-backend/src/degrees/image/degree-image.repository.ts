import {Repository,EntityRepository} from "typeorm";
import {DegreeImage} from "./degree-image.entity";
import {CreateDegreeImageDto} from "../dto/create-degree-image.dto";
import {Degree} from "../degree.entity";



@EntityRepository(DegreeImage)
export class DegreeImageRepository extends Repository<DegreeImage> {

  getDegreeImagesById(degreeId:number) : Promise<DegreeImage[]>{
    return this.find({where:{degreeId:degreeId}});
  }

  async createDegreeImage(degree:Degree,image:string) : Promise<DegreeImage>{

    const degreeImage = new DegreeImage();
    degreeImage.degree = degree;
    degreeImage.image = image;
    const result = await this.save(degreeImage);
    return result;
  }



}
