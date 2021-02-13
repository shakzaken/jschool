import {Course, CreateDegreeDto, Degree, DegreeCourses, DegreeImage} from "../types/types";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {Form} from "semantic-ui-react";

export class DegreesApi{


    async getAllDegrees() : Promise<Degree[]>{
        const result : AxiosResponse<Degree[]> = await axios.get("degrees");
        return result.data;
    }

    async createDegree(degree : CreateDegreeDto) : Promise<Degree>{
        const response = await axios.post("degrees",degree);
        return response.data;
    }

    async deleteDegree(degreeId :number) : Promise<any>{
        const response = await axios.delete(`degrees/${degreeId}`);
        return response;
    }

    async saveDegreeImages(degreeId:number,formData: FormData) : Promise<DegreeImage[]>{
        const config : AxiosRequestConfig = {
            headers:{ 'content-type': 'multipart/form-data'}
        };
        const result = await axios.post(`degrees/images/${degreeId}`,formData,config);
        return result.data;
    }

    async getDegreeImages(degreeId : number) : Promise<DegreeImage[]>{
        const result = await axios.get(`degrees/images/${degreeId}`);
        return result.data;
    }

    async updateDegree(degree :Degree) : Promise<Degree>{
        const response = await axios.put("degrees",degree);
        return response.data;
    }

    async getDegreeCourses(degreeId :number){
        const response : AxiosResponse<Course[]> = await axios.get(`degrees/courses/${degreeId}`);
        return response.data;
    }

    async saveDegreeCourses(degreeCourses : DegreeCourses) : Promise<any>{
        const response = await axios.post("/degrees/courses",degreeCourses);
        return response.data;
    }
}