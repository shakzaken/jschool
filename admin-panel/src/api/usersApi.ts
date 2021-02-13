export class UsersApi{

    private baseUrl : string;

    constructor(baseUrl : string) {
        this.baseUrl = `${baseUrl}/users`;
    }
}