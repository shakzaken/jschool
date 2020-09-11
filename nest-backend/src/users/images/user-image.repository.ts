import {EntityRepository, Repository} from "typeorm";
import {UserImage} from "./user-image.entity";
import {User} from "../user.entity";

@EntityRepository(UserImage)
export class UserImageRepository extends Repository<UserImage>{



  async getUserImagesById(userId:number) : Promise<UserImage[]>{
    return this.find({where:{userId:userId}});
  }

  async createUserImage(user:User,image:string){
    const userImage = new UserImage();
    userImage.user = user;
    userImage.image = image;
    const result = await this.save(userImage);
    return result;
  }

}
