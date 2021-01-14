import {observable,action} from "mobx";
import {CourseModel, DegreeComment, DegreeImage, DegreeModel} from "../types";
import axios, {AxiosResponse} from "axios";


export class DegreePageStore {




    @observable
    degree:DegreeModel;

    @observable.ref
    courses:CourseModel[] = [];

    @observable.ref
    images:DegreeImage[] = [];

    @observable.ref
    comments:DegreeComment[] = [];


    async fetchDegreeData(degreeId:number){
        const response : AxiosResponse<DegreeModel> = await axios.get(`degrees/${degreeId}`);
        console.log(response);
        const degreeData :DegreeModel = response.data;
        this.setDegreeFields(degreeData);
    }

    @action.bound
    setDegreeFields(degreeData:DegreeModel){
        this.courses = degreeData.courses;
        this.images = degreeData.degreeImages;
        this.comments = degreeData.degreeComments;
        const degree = {
            id: degreeData.id,
            name:degreeData.name,
            description:degreeData.description
        };
        this.degree = degree;
    }
}
