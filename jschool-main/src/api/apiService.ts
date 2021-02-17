import axios, {AxiosResponse} from "axios";
import {CourseModel, DegreeComment, DegreeCommentDto, DegreeImage, DegreeModel} from "../types";
import {DegreeApi} from "./degreeApi";
import {CoursesApi} from "./coursesApi";
import {AuthApi} from "./authApi";

class ApiService{


    public degrees = new DegreeApi();
    public courses = new CoursesApi();
    public auth = new AuthApi();


}

const api : ApiService = new ApiService();
export {api};