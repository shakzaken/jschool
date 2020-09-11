import {Repository,EntityRepository} from "typeorm";
import {DegreeComment} from "./degree-comment.entity";
import {User} from "../../users/user.entity";
import {Degree} from "../degree.entity";


@EntityRepository(DegreeComment)
export class DegreeCommentsRepository extends Repository<DegreeComment>{


  async createDegreeComment(user:User,degree:Degree,comment:string) : Promise<DegreeComment>{
    const degreeComments = new DegreeComment();
    degreeComments.user = user;
    degreeComments.degree = degree;
    degreeComments.comment = comment;
    degreeComments.date = new Date();

    const res = await this.save(degreeComments);
    return res;
  }


  async getDegreeCommentsById(degreeId: number) : Promise<DegreeComment[]>{
    return this.find({where:{degreeId:degreeId}});
  }

}
