import {CoursesApi} from "./coursesApi";
import {DegreesApi} from "./degreesApi";


class Api{

    public courses : CoursesApi;
    public degrees : DegreesApi;

    constructor() {
        this.courses = new CoursesApi();
        this.degrees = new DegreesApi();
    }

}

const api = new Api();
export {api};