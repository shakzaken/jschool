import axios, {AxiosResponse} from "axios";
import {LoginDto, LoginResponse} from "../types";

export class AuthApi {

    async login(loginData :LoginDto) : Promise<LoginResponse>{
        const res : AxiosResponse<LoginResponse> = await axios.post("/auth/login",loginData);
        return res.data;
    }


    setAuthHeader(token : string){
        axios.defaults.headers["Authorization"] = token;
    }
}