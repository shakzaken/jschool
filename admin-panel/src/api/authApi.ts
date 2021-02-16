import {LoginDto, LoginResponse} from "../types/types";
import axios, {AxiosResponse} from "axios";

export class AuthApi{


    public async login(loginDto : LoginDto) : Promise<LoginResponse>{
        const res: AxiosResponse<LoginResponse> = await axios.post("auth/login",loginDto);
        return res.data;
    }


}