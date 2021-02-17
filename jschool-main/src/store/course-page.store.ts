import {AuthStore} from "./auth-store";
import {action, computed, observable} from "mobx";
import {CourseComment, CourseCommentDto, CourseImage, CourseModel} from "../types";
import {api} from "../api/apiService";

export class CoursePageStore {

    authStore:AuthStore;

    @observable
    courseId:number;

    @observable
    course: CourseModel;

    @observable
    comments: CourseComment[] = [];

    @observable
    image: CourseImage = null;

    @observable
    formComment: string= "";

    @observable
    loading: boolean = true;

    constructor(authStore:AuthStore) {
        this.authStore = authStore;
    }

    @computed
    get courseName() : string{
        if(this.course){
            return this.course.name
        }
        return null;
    }



    @computed
    get courseImageSrc(): string {
        if(this.image){
            const imageBody = this.image.image;
            return `data:image/png;base64,${imageBody}`;
        }
        return null;
    }


    @action.bound
    setCourse(course:CourseModel){
        this.course = course;
    }

    @action.bound
    setCourseId(courseId:number){
        this.courseId = courseId;
    }

    @action.bound
    setComments(comments: CourseComment[]){
        this.comments = comments;
    }

    @action.bound
    setImage(image:CourseImage){
        this.image = image;
    }

    @action.bound
    setFormComment(comment:string){
        this.formComment = comment;
    }

    @action.bound
    setLoading(loading:boolean){
        this.loading = loading;
    }


    async onPageLoad(courseId:number){
        this.setCourseId(courseId);
        this.fetchCourseData();
        this.fetchCourseImages();
        this.fetchCourseComments();

    }

    async fetchCourseData(){
        const courseData = await api.courses.getCourse(this.courseId);
        this.setCourse(courseData);
    }

    async fetchCourseComments(){
        const courseComments = await api.courses.getCourseComments(this.courseId);
        this.setComments(courseComments);
    }

    async fetchCourseImages(){
        const courseImages = await api.courses.getCourseImages(this.courseId);
        this.setImage(courseImages);
    }

    async deleteCourseComment(commentId:number){
        try{
            await api.courses.deleteCourseComment(commentId);
            this.fetchCourseComments()
        }catch (err){
            console.log("failed to fetch course comments")
        }
    }

    async createCourseComment(){
        const commentDto : CourseCommentDto = {
            comment: this.formComment,
            userId: this.authStore.user.id,
            courseId: this.course.id
        };
        await api.courses.createCourseComment(commentDto);
        this.setFormComment("");
        this.fetchCourseComments()
            .catch(err => console.log("failed to fetch course comments"));
    }
}
