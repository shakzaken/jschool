export interface DegreeModel {
  id:number;
  name:string;
  description:string;
  degreeImages:any[];

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
