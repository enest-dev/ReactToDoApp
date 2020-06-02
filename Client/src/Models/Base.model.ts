export class BaseModel {
    id: string;
    createdOn: Date;
    updatedOn: Date;
    constructor(data: Partial<BaseModel>) {
        this.id = (data && data.id) || "";
        this.createdOn = (data && new Date(data.createdOn)) || null;
        this.createdOn = (data && new Date(data.createdOn)) || null;
    }
}