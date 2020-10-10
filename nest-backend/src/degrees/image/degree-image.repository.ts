import {Repository,EntityRepository} from "typeorm";
import {DegreeImage} from "./degree-image.entity";
import {CreateDegreeImageDto} from "../dto/create-degree-image.dto";
import {Degree} from "../degree.entity";



@EntityRepository(DegreeImage)
export class DegreeImageRepository extends Repository<DegreeImage> {

  getDegreeImagesById(degreeId:number) : Promise<DegreeImage[]>{
    return this.find({where:{degreeId:degreeId}});
  }

  async createDegreeImages(degree:Degree,images:string[]) : Promise<DegreeImage[]>{

    const degreeImages: DegreeImage[] = images.map(  (image) => {
      const degreeImage = new DegreeImage();
      degreeImage.degree = degree;
      degreeImage.image = image;
      return degreeImage;
    });
    return this.save(degreeImages)

  }

  async deleteDegreeImage(degreeImage: DegreeImage[]){
    return this.remove(degreeImage);
  }



}
