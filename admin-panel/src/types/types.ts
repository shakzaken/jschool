export interface User {
  id:number;
  email:string;
  name:string;

}

export enum MenuOptions {
  CreateCourse = "CreateCourse",
  CoursesList = "CoursesList",
  CourseEdit ="CourseEdit",
  CreateUser = "CreateUser",
  UsersList= "UsersList",
  UserEdit="UserEdit",
  CreateDegree = "CreateDegree",
  DegreeList="DegreeList",
  DegreeEdit="DegreeEdit"
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

export class CreateUserDto {

  name:string;
  email:string;
  password:string;
}
