import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {Course, CourseImage, CreateCourseDto} from "../types/types";

export class CoursesApi {


    async getAllCourses() : Promise<Course[]>{
        const response : AxiosResponse<Course[]> = await axios.get("courses");
        return response.data;
    }

    async createCourse(course : CreateCourseDto) : Promise<Course>{
        const response = await axios.post("courses",course);
        return response.data;
    }

    async saveCourseImages(courseId:number,formData:FormData) : Promise<CourseImage>{
        const config : AxiosRequestConfig = {
            headers:{ 'content-type': 'multipart/form-data'}
        };
        const result = await axios.post(`courses/images/${courseId}`,formData,config);
        return result.data;
    }

    async getCourseImages(courseId:number): Promise<CourseImage>{
        const result = await axios.get(`courses/images/${courseId}`);
        return result.data;
    }

    async updateCourse(course :Course) : Promise<Course>{
        const response = await axios.put("courses",course);
        return response.data;
    }

    async deleteCourse(courseId:number) : Promise<any>{
        const response = await axios.delete(`courses/${courseId}`);
        return response;
    }


}