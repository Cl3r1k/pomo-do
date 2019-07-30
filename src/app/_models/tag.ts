export class Tag {
    // As far this class used to store data in 'localStorage' here used Snake_case notation for variables
    id: number;
    tagName: string;
    created_time: string;
    updated_time: string;
    color: string;
    readyToDelete = false;

    constructor(tagName) {
        this.tagName = tagName;
        this.created_time = new Date().toISOString();
        this.updated_time = null;
        this.color = 'red';
    }
}
