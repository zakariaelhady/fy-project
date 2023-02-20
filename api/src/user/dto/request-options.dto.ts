import { SortOrder } from "mongoose";

export class RequestOptionsDto{
    skip: number;
    limit:number;
    sort: [sortedBy: string, sortOrder: SortOrder];
    constructor(limit: number,skip:number,sort: [sortedBy: string, sortOrder: SortOrder]){
        this.limit=limit;
        this.skip=skip;
        this.sort=sort;
    }
}