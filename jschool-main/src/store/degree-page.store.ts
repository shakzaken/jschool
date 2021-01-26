import {observable, action, computed} from "mobx";
import {CourseModel, DegreeComment, DegreeCommentDto, DegreeImage, DegreeModel} from "../types";
import axios, {AxiosResponse} from "axios";
import {AuthStore} from "./auth-store";


export class DegreePageStore {


    private authStore : AuthStore;


    @observable
    degree:DegreeModel;

    @observable.struct
    courses:CourseModel[] = [];

    @observable
    currentComment: string = "";

    @observable.struct
    images:DegreeImage[] = [];

    @observable
    comments:DegreeComment[] = [];

    constructor(authStore:AuthStore) {
        this.authStore = authStore;
    }

    @computed
    get degreeImageSrc(){
        if(this.images && this.images.length > 0){
            const imageBody = this.images[0].image;
            return `data:image/png;base64,${imageBody}`;
        }
    }


    @action.bound
    setCurrentComment(comment:string){
        this.currentComment = comment;
    }


    @action.bound
    setDegreeFields(degreeModel:DegreeModel,degreeImages:DegreeImage[],
                    degreeComments:DegreeComment[],degreeCourses:CourseModel[]){
        this.setDegreeModel(degreeModel);
        this.setDegreeImage(degreeImages);
        this.setDegreeComments(degreeComments);
        this.setDegreeCourses(degreeCourses);

    }

    @action.bound
    setDegreeModel(degreeModel:DegreeModel){
        this.degree = degreeModel;
    }

    @action.bound
    setDegreeImage(degreeImages:DegreeImage[]){
        this.images = degreeImages;
    }

    @action.bound
    setDegreeComments(degreeComments:DegreeComment[]){
        this.comments = degreeComments;
    }

    @action.bound
    setDegreeCourses(degreeCourses: CourseModel[]){
        this.courses = degreeCourses;
    }

    async fetchDegreeData(degreeId:number){
        const degreeResponse : AxiosResponse<DegreeModel> = await axios.get(`degrees/${degreeId}`);
        const degreeImage: AxiosResponse<DegreeImage[]> = await axios.get(`degrees/images/${degreeId}`);
        const degreeComments : AxiosResponse<DegreeComment[]> = await axios.get(`degrees/comments/${degreeId}`);
        const degreeCourses : AxiosResponse<CourseModel[]> = await axios.get(`degrees/courses/${degreeId}`);

        const degreeData :DegreeModel = degreeResponse.data;
        this.setDegreeFields(degreeData,degreeImage.data,degreeComments.data,degreeCourses.data);
    }

    async saveDegreeComment(){
        const commentDto : DegreeCommentDto = {
            degreeId: this.degree.id,
            comment: this.currentComment,
            userId: this.authStore.user.id
        }
        const result : AxiosResponse<DegreeComment> = await axios.post("degrees/comments",commentDto)
        const comment: DegreeComment = result.data;
        this.addComment(comment);
    }

    async onCommentDelete(commentId:number){
        await axios.delete(`degrees/comments/${commentId}`);
        const comment :DegreeComment = this.comments.find(comment => comment.id === commentId);
        //@ts-ignore;
        this.comments.remove(comment);
    }

    @action.bound
    addComment(comment:DegreeComment){
        this.comments.push(comment);
    }


}
