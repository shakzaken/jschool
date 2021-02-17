import {CourseModel, DegreeComment, DegreeCommentDto, DegreeImage, DegreeModel} from "../types";
import axios, {AxiosResponse} from "axios";

export class DegreeApi{
    async getDegrees() : Promise<DegreeModel[]>{
        const res: AxiosResponse<DegreeModel[]> = await axios.get("degrees/images");
        return res.data;
    }

    async getDegreeData(degreeId:number) : Promise<DegreeModel>{
        const degreeResponse : AxiosResponse<DegreeModel> = await axios.get(`degrees/${degreeId}`);
        return degreeResponse.data;
    }

    async getDegreeCourses(degreeId:number) : Promise<CourseModel[]>{
        const coursesResponse : AxiosResponse<CourseModel[]> = await axios.get(`degrees/courses/${degreeId}`);
        return coursesResponse.data;

    }

    async getDegreeComments(degreeId:number): Promise<DegreeComment[]>{
        const degreeCommentsResponse : AxiosResponse<DegreeComment[]> = await axios.get(`degrees/comments/${degreeId}`);
        return degreeCommentsResponse.data;

    }

    async getDegreeImages(degreeId:number): Promise<DegreeImage[]>{
        const degreeImagesResponse: AxiosResponse<DegreeImage[]> = await axios.get(`degrees/images/${degreeId}`);
        return degreeImagesResponse.data;
    }

    async saveDegreeComment(commentDto :DegreeCommentDto){
        const result : AxiosResponse<DegreeComment> = await axios.post("degrees/comments",commentDto)
        return result.data;
    }

    async deleteDegreeComment(commentId:number) : Promise<any>{
        const response = await axios.delete(`degrees/comments/${commentId}`);
        return response.data;
    }
}