import {CoursesApi} from "./coursesApi";
import {DegreesApi} from "./degreesApi";
import {UsersApi} from "./usersApi";
import {AuthApi} from "./authApi";
import axios from "axios";


class Api{

    public courses : CoursesApi;
    public degrees : DegreesApi;
    public users: UsersApi;
    public auth: AuthApi;

    constructor() {
        this.courses = new CoursesApi();
        this.degrees = new DegreesApi();
        this.users = new UsersApi();
        this.auth = new AuthApi();
    }


    setDefaultAuthHeaders(token: string){
        axios.defaults.headers["Authorization"] = token;
    }

}

const api = new Api();
export {api};