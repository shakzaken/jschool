import {AuthStore} from "./auth-store";

export class CoursePageStore {

    authStore:AuthStore;

    constructor(authStore:AuthStore) {
        this.authStore = authStore;
    }
}
