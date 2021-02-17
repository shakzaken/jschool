import {observable, action, computed} from "mobx";
import {CourseModel, DegreeComment, DegreeCommentDto, DegreeImage, DegreeModel} from "../types";
import {AuthStore} from "./auth-store";
import {api} from "../api/apiService";

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

        const degreeData = await api.degrees.getDegreeData(degreeId);
        const degreeImage = await api.degrees.getDegreeImages(degreeId);
        const degreeComments = await api.degrees.getDegreeComments(degreeId);
        const degreeCourses = await api.degrees.getDegreeCourses(degreeId);

        this.setDegreeFields(degreeData,degreeImage,degreeComments,degreeCourses);
    }

    async saveDegreeComment(){
        const commentDto : DegreeCommentDto = {
            degreeId: this.degree.id,
            comment: this.currentComment,
            userId: this.authStore.user.id
        }
        const comment: DegreeComment = await api.degrees.saveDegreeComment(commentDto);
        this.addComment(comment);
    }

    async onCommentDelete(commentId:number){
        await api.degrees.deleteDegreeComment(commentId);
        const comment :DegreeComment = this.comments.find(comment => comment.id === commentId);
        //@ts-ignore;
        this.comments.remove(comment);
    }

    @action.bound
    addComment(comment:DegreeComment){
        this.comments.push(comment);
    }


}
