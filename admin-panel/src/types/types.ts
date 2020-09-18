export interface User {
  id:number;
  email:string;
  name:string;

}

export enum MenuOptions {
  CreateCourse = "CreateCourse",
  CoursesList = "CoursesList",
  CreateUser = "CreateUser",
  UsersList= "UsersList",
  CreateDegree = "CreateDegree",
  DegreeList="DegreeList"
}


export interface Degree {
  id:number;
  name:string;
  description:string;
}


export interface Course {
  id:number;
  name:string;
  description:string;
}


export interface CreateDegreeDto {

  name:string;
  description:string;
}

export interface CreateCourseDto {
  name:string;
  description:string;
}

export interface LoginDto {
  email:string;
  password:string;
}

export  interface  LoginResponse{
  user: User;
  token: string;
}
