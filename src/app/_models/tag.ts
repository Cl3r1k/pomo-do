export class Tag {
    // As far this class used to store data in 'localStorage' here used Snake_case notation for variables
    id: number;
    tag_name: string;
    created_time: string;
    updated_time: string;
    color: string;
    readyToDelete = false;

    constructor(tagName) {
        this.tag_name = tagName;
        this.created_time = new Date().toISOString();
        this.updated_time = null;
        this.color = 'red';
    }
}
