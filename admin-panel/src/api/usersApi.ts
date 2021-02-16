import {CreateUserDto, User, UserImage} from "../types/types";
import axios, {AxiosRequestConfig} from "axios";
import {UserImageEdit} from "../components/users/user-image-edit";

export class UsersApi{



    public async getUsers() : Promise<User[]>{
        const users = await axios.get(`users`);
        return users.data;
    }

    public async deleteUser(userId:number) : Promise<any>{
        const response = await axios.delete(`users/${userId}`);
        return response.data;
    }

    public async updateUser(user: User) : Promise<User>{
        const result = await axios.put("users",user);
        return result.data;
    }

    public async createUser(user:CreateUserDto) : Promise<User>{
        const response = await axios.post("users",user);
        return response.data;
    }

    public async saveUserImage(userId:number,formData:FormData) : Promise<UserImage>{
        const config : AxiosRequestConfig = {
            headers:{ 'content-type': 'multipart/form-data'}
        };
        const result = await axios.post(`users/images/${userId}`,formData,config);
        return result.data;
    }

    public async getUserImages(userId:number) : Promise<UserImage[]>{
        const result = await axios.get(`users/images/${userId}`);
        return result.data;
    }
}