import { BaseModel } from "./Base.model";

export class User extends BaseModel {
    email: string;
    picture: string;
    name: string;

    constructor(data?: Partial<User>) {
        super(data);
        this.email = (data && data.email) || "";
        this.picture = (data && data.picture) || "";
        this.name = (data && data.name) || "";
    }

}