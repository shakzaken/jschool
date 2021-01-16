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

    async fetchDegreeData(degreeId:number){
        const response : AxiosResponse<DegreeModel> = await axios.get(`degrees/${degreeId}`);
        const degreeData :DegreeModel = response.data;
        this.setDegreeFields(degreeData);
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
