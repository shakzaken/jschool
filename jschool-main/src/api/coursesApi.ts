import {CourseComment, CourseCommentDto, CourseImage, CourseModel} from "../types";
import axios, {AxiosResponse} from "axios";

export class CoursesApi {


    async getCourse(courseId:number) : Promise<CourseModel>{
        const response : AxiosResponse<CourseModel> = await axios.get(`/courses/${courseId}`);
        return response.data;
    }

    async getCourseImages(courseId:number) : Promise<CourseImage> {
        const response : AxiosResponse<CourseImage> = await axios.get(`/courses/images/${courseId}`);
        return response.data;
    }
    async getCourseComments(courseId:number) : Promise<CourseComment[]>{
        const response : AxiosResponse<CourseComment[]> = await axios.get(`/courses/comments/${courseId}`);
        return response.data;
    }

    async createCourseComment(commentDto : CourseCommentDto) : Promise<CourseComment>{
        const response = await axios.post("/courses/comments",commentDto);
        return response.data;
    }

    async deleteCourseComment(commentId : number) : Promise<any>{
        const response = await axios.delete(`/courses/comments/${commentId}`);
        return response.data;
    }
}