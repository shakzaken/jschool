export interface DegreeModel {
  id:number;
  name:string;
  description:string;
  degreeImages?:any[];
  courses?: CourseModel[];
  degreeComments?:DegreeComment[];
}

export interface DegreeComment{
  id:number;
  comment:string;
  degreeId:number;
  userId:number;
  date:Date;
}

export interface DegreeCommentDto {
  comment:string;
  degreeId:number;
  userId:number;
}


export interface DegreeImage{
  id:number;
  image:string;
  degreeId:number;
}

export interface UserModel {
  email:string;
  id:number;
  name:string;
}


export interface LoginResponse {
  user: UserModel;
  token:string;
}

export interface CourseModel {
  id:number;
  name:string;
  description:string;
  courseComments?:CourseComment[]
  courseImages?:CourseImage[];
}

export interface CourseComment {
  id:number;
  userId:number;
  courseId:number;
  comment:string;
  date:Date;
}

export interface CourseImage{
  id:number;
  image:string;
  courseId:number;
}