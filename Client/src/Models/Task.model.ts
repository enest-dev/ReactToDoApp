import { BaseModel } from "./Base.model";

export class Task extends BaseModel {
    title: string;
    description: string;
    assignedTo: string;

    constructor(data?: Partial<Task>) {
        super(data);
        this.title = (data && data.title) || "";
        this.description = (data && data.description) || "";
        this.assignedTo = (data && data.assignedTo) || "";
    }

}